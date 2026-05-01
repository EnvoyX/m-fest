"use client";

import Countdown from "react-countdown";


export default function CountdownEventClient({
    date,

}: {
    date: Date;
}) {
    return (
        <Countdown
            date={date}
            renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {

                }

                return (
                    <div className="flex items-end gap-3 justify-center w-full max-sm:flex-col max-sm:items-center">
                        <TimerBox value={days} label="Days" />
                        <Separator />
                        <TimerBox value={hours} label="Hours" />
                        <Separator />
                        <TimerBox value={minutes} label="Minutes" />
                    </div>

                );
            }}
        />
    );
}


function TimerBox({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="border-2 border-gray-400 rounded-lg w-20 h-24 sm: md:w-24 md:h-28 flex flex-col items-center justify-center bg-[#252538] text-white">
            <span className="text-3xl md:text-4xl font-bold">{value}</span>
            <span className="text-sm md:text-base text-gray-300">{label}</span>
        </div>
    );
}

function Separator() {
    return (
        <div className="flex flex-col gap-1 pb-6 md:pb max-sm:hidden">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
    );
}
