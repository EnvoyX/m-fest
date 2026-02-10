"use client"

import { useTRPC } from "@/utils/trpc"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "../ui/badge"

type QuotaTrackProps = {
    comp: string,
    fetchedCurrentQuota: number,
    maxQuota: number,
}

export default function QuotaTrack({ comp, fetchedCurrentQuota, maxQuota }: QuotaTrackProps) {
    const trpc = useTRPC()
    // defaults to fetchedCurrentQuota if currentQuotas is undefined
    const { data: currentQuotas = fetchedCurrentQuota } = useQuery({
        ...trpc.dashboard.getCurrentQuotaByCompName.queryOptions({
            comp,
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


    return (
        <Badge className="bg-primary/30 text-primary border-primary/50 border  mb-5">
            <span className="text-sm">{maxQuota - currentQuotas <= 0 ? "No Slots Left" : `${maxQuota - currentQuotas} Slots Left`}</span>
        </Badge>
    )
}
