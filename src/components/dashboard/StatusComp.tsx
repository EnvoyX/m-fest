"use client"
import { getCurrentDate } from "@/lib/utils";
import { isBefore, isWithinInterval } from "date-fns";
import { Badge } from "../ui/badge";
import type { CompetitionName } from "../../../prisma/generated/prisma/enums";
import type { Competition } from "@/lib/competition";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

type StatusCompProps = {
    comp: Competition;
    fetchedCurrentQuota: number,
    maxQuota: number;
};

export default function StatusComp({ comp, fetchedCurrentQuota, maxQuota }: StatusCompProps) {
    const currentDate = getCurrentDate();
    const trpc = useTRPC()
    const compName = comp.abbreviation
    // defaults to fetchedCurrentQuota if currentQuotas is undefined
    const { data: currentQuotas = fetchedCurrentQuota } = useQuery({
        ...trpc.dashboard.getCurrentQuotaByCompName.queryOptions({
            comp: compName,
        }),
        enabled: fetchedCurrentQuota < maxQuota,

        // polling query every 2 seconds (in milliseconds)
        refetchInterval: (query) => {
            const data = query.state.data
            return data && data >= maxQuota ? false : 2000
        },

        // In milliseconds
        staleTime: 30_000, // same as 30000
        gcTime: 5 * 60_000, // same as 5 * 60000

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,

    })

    const isQuotaFull = currentQuotas >= maxQuota
    return (
        <>
            {isBefore(currentDate, comp.startRegDate1) ? (
                <Badge variant={"default"}>Not Started</Badge>
            ) : isWithinInterval(currentDate, {
                start: comp.startRegDate1,
                end: comp.endRegDate1,
            }) && !isQuotaFull ? (
                <Badge
                    variant={"secondary"}
                    className="bg-blue-500 text-white dark:bg-blue-600"
                >
                    Early Bird
                </Badge>
            ) : isWithinInterval(currentDate, {
                start: comp.startRegDate2,
                end: comp.endRegDate2,
            }) && !isQuotaFull ? (
                <Badge variant="secondary" className="bg-green-600 text-white">
                    Regular
                </Badge>
            ) : isWithinInterval(currentDate, {
                start: comp.startRegDate3,
                end: comp.endRegDate3,
            }) && !isQuotaFull ? (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                    Extended
                </Badge>
            ) : (
                <Badge variant="destructive">Closed</Badge>
            )}
        </>
    )
}
