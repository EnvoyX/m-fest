// components/countdown-compact.tsx
"use client";

import Countdown from "react-countdown";
import { Timer } from "lucide-react";

export default function CompactCountdown({ date }: { date: Date }) {
    return (
        <Countdown
            date={date}
            renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                    return (
                        <span className="text-destructive font-medium">
                            Deadline Passed
                        </span>
                    );
                }
                return (
                    <div className="flex items-center gap-1.5 font-mono text-sm tracking-tighter">
                        <Timer className="size-3.5 animate-pulse text-red-500" />
                        <div className="flex gap-1 items-baseline">
                            {days > 0 && (
                                <span>
                                    {days}
                                    <span className="text-[10px] ml-0.5 font-sans uppercase opacity-70">
                                        d
                                    </span>
                                </span>
                            )}
                            <span>
                                {hours.toString().padStart(2, "0")}
                                <span className="text-[10px] ml-0.5 font-sans uppercase opacity-70">
                                    h
                                </span>
                            </span>
                            <span className="animate-pulse">:</span>
                            <span>
                                {minutes.toString().padStart(2, "0")}
                                <span className="text-[10px] ml-0.5 font-sans uppercase opacity-70">
                                    m
                                </span>
                            </span>
                            <span className="animate-pulse">:</span>
                            <span>
                                {seconds.toString().padStart(2, "0")}
                                <span className="text-[10px] ml-0.5 font-sans uppercase opacity-70">
                                    s
                                </span>
                            </span>
                        </div>
                    </div>
                );
            }}
        />
    );
}
