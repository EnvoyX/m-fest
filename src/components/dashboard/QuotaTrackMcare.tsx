"use client"

import { useTRPC } from "@/utils/trpc"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "../ui/badge"

type QuotaTrackProps = {
    fetchedCurrentQuota: number,
    maxQuota: number,
}

export default function QuotaTrackMcare({ fetchedCurrentQuota, maxQuota }: QuotaTrackProps) {
    const trpc = useTRPC()

    const { data: currentQuotas = fetchedCurrentQuota } = useQuery({
        ...trpc.dashboard.getCurrentQuotaEyeCheckUp.queryOptions(),
        
        enabled: fetchedCurrentQuota < maxQuota,

        refetchInterval: (query) => {
            const data = query.state.data
            // Optimization: stop polling if data exists and we hit/exceed max
            return typeof data === 'number' && data >= maxQuota ? false : 2000
        },

        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })

    const remaining = maxQuota - currentQuotas

    return (
        <Badge className="bg-primary/30 text-primary border-primary/50 border mb-5">
            <span className="text-sm">
                {remaining <= 0 ? "No Slots Left" : `${remaining} Slots Left`}
            </span>
        </Badge>
    )
}