"use client"

import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function RunnerCount() {
    const trpc = useTRPC()
    const { data: mrunJoinedCount } = useQuery({
        ...trpc.dashboard.getMRUNJoinedCount.queryOptions(),
        refetchInterval: 2000,
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })

    console.log("MRUN Joined Count:", mrunJoinedCount);

    return (
        <Badge variant="secondary">
            {mrunJoinedCount} Runners Have Joined
        </Badge>
    );
}

export function RunnerCountMain() {
    const trpc = useTRPC()
    const { data: mrunJoinedCount } = useQuery({
        ...trpc.dashboard.getMRUNJoinedCount.queryOptions(),
        refetchInterval: 2000,
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    })

    return (
        <div>
            <h2 className="text-2xl md:text-3xl text-center font-semibold">
                <span className="text-4xl md:text-5xl font-bold">{mrunJoinedCount}</span><br/> Runners Have Joined!
            </h2>
        </div>
    )
}