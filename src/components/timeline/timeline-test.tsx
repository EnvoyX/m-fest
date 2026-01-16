import { Timeline } from "@/components/ui/timeline";
import { BlurFade } from "../ui/blur-fade";

export function TimelineTest() {
    const timelineData = [
        {
            title: "18 January 2026",
            content: (
                <div className="flex flex-col gap-2" key={1}>
                    <p className="text-4xl font-semibold">Starting Phase</p>
                    <p className="text-2xl font-semibold">
                        Competition Registration
                    </p>
                </div>
            ),
        },
        {
            title: "14 February 2026",
            content: (
                <div className="flex flex-col gap-2" key={2}>
                    <p className="text-4xl font-semibold">Pre-Program</p>
                    <p className="text-2xl font-semibold">
                        M-Care: Klinik Mesin
                    </p>
                </div>
            ),
        },
        {
            title: "15 February 2026",
            content: (
                <div className="flex flex-col gap-2" key={3}>
                    <p className="text-4xl font-semibold">Pre-Program</p>
                    <p className="text-2xl font-semibold">
                        M-Care: Hari Main Bersama (HMB)
                    </p>
                </div>
            ),
        },
        {
            title: "7 Maret 2026",
            content: (
                <div className="flex flex-col gap-2" key={4}>
                    <p className="text-4xl font-semibold">Acceleration Phase</p>
                    <p className="text-2xl font-semibold">
                        Engine Tune-Up
                    </p>
                </div>
            ),
        },
        {
            title: "3 May 2026",
            content: (
                <div className="flex flex-col gap-2" key={5}>
                    <p className="text-4xl font-semibold">Acceleration Phase</p>
                    <p className="text-2xl font-semibold">
                        M-Run
                    </p>
                </div>
            ),
        },
        {
            title: "8-9 May 2026",
            content: (
                <div className="flex flex-col gap-2" key={6}>
                    <p className="text-4xl font-semibold">Ending Phase</p>
                    <p className="text-2xl font-semibold">
                        Competition Finals, M-Talks, M-Expo, and Ceremony
                    </p>
                </div>
            ),
        },
    ];

    return (
        <section className="">
            <div className="relative w-full mx-auto max-w-5xl" id="timeline">
                <BlurFade inView delay={0.2}>
                    <Timeline data={timelineData} />
                </BlurFade>
            </div>
        </section>
    );
}
