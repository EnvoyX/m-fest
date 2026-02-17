"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { cn, getCurrentDate } from "@/lib/utils";
import { isWithinInterval } from "date-fns";
import { ChevronRight, Plus } from "lucide-react";
import type { competition } from "@/lib/competition";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import type { RegisteredCompetitionsList, UserTeam } from "@/types/prisma";

export type ButtonCompProps = {
    fetchedCurrentQuota: number;
    maxQuota: number;
    comp: competition;
    isTeamLeader: boolean;
    userTeam: UserTeam;
    registeredCompetitions: RegisteredCompetitionsList;
}

export default function ButtonComp({ comp, fetchedCurrentQuota, maxQuota, isTeamLeader, userTeam, registeredCompetitions }: ButtonCompProps) {
    const currentDate = getCurrentDate()
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
            {!userTeam && !isQuotaFull ? (
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-1 pr-1.5"
                >
                    <Link href="/dashboard/team/create-team">
                        <span>Create Team</span>
                        <Plus className="size-4" />
                    </Link>
                </Button>
            ) : (
                <Button
                    variant="default"
                    size="sm"
                    className={cn("gap-1 pr-1.5 cursor-pointer", {
                        "bg-muted-foreground pointer-events-none cursor-not-allowed":
                            registeredCompetitions.length ||
                            !isWithinInterval(currentDate, {
                                start: comp.startRegDate3,
                                end: comp.endRegDate3,
                            }) ||
                            !userTeam ||
                            !isTeamLeader,
                    })}
                    disabled={
                        registeredCompetitions.length
                            ? true
                            : false ||
                            !isWithinInterval(currentDate, {
                                start: comp.startRegDate3,
                                end: comp.endRegDate3,
                            }) ||
                            !userTeam ||
                            !isTeamLeader ||
                            isQuotaFull
                    }
                >
                    <Link
                        href={
                            registeredCompetitions.length ||
                                !isWithinInterval(currentDate, {
                                    start: comp.startRegDate1,
                                    end: comp.endRegDate3,
                                }) ||
                                !userTeam ||
                                !isTeamLeader
                                ? ""
                                : `/dashboard/team/register/${comp.abbreviation}`
                        }
                        prefetch
                        className="flex items-center gap-2"
                    >
                        <span>{isQuotaFull ? "Quota Full" : "Register"}</span>
                        <ChevronRight className="size-4" />
                    </Link>
                </Button>
            )}
        </>
    )
}
