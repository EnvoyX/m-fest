"use client"

import { useTRPC } from "@/utils/trpc"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"

type QuotaTrackProps = {
    motorType: "MANUAL" | "MATIC",
    fetchedCurrentQuota: any,
    maxQuota: number,
}

export default function QuotaTrackETU({ motorType, fetchedCurrentQuota, maxQuota }: QuotaTrackProps) {
    const trpc = useTRPC()
    // defaults to fetchedCurrentQuota if currentQuotas is undefined
    const { data: currentMotorTypeQuotas = fetchedCurrentQuota } = useQuery({
        ...trpc.dashboard.getCurrentMotorTypeQuota.queryOptions(undefined),
        enabled: fetchedCurrentQuota < maxQuota,

        // polling query every 2 seconds (in milliseconds)
        refetchInterval: 2000,
        // In milliseconds
        staleTime: 30_000, // same as 30000
        gcTime: 5 * 60_000, // same as 5 * 60000})
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })

    const maticQuota =  currentMotorTypeQuotas.MATIC ?? fetchedCurrentQuota
    const manualQuota = currentMotorTypeQuotas.MANUAL ?? fetchedCurrentQuota;

    return (
        <Badge className="bg-primary/30 text-primary border-primary/50 border  mb-5">
            <span className="text-sm">{motorType === "MATIC" ? `Matic: ${maxQuota - maticQuota} Slots Left` : `Manual: ${maxQuota - manualQuota} Slots Left`}</span>
        </Badge>
    )
}
