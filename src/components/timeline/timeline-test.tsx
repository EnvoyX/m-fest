import React from "react";
// Assuming these are your local UI components
import { Timeline } from "@/components/ui/timeline";
import { BlurFade } from "@/components/ui/blur-fade";

export function TimelineTest() {
  const timelineData = [
    {
      date: "18 January 2026",
      phase: "Starting Phase",
      event: "Competition Registration",
    },
    {
      date: "14 February 2026",
      phase: "Pre-Program",
      event: "M-Care: Klinik Mesin",
    },
    {
      date: "15 February 2026",
      phase: "Pre-Program",
      event: "M-Care: Hari Main Bersama (HMB)",
    },
    {
      date: "7 Maret 2026",
      phase: "Acceleration Phase",
      event: "Engine Tune-Up",
    },
    { date: "3 May 2026", phase: "Acceleration Phase", event: "M-Run" },
    {
      date: "8-9 May 2026",
      phase: "Ending Phase",
      event: "Competition Finals, M-Talks, M-Expo, and Ceremony",
    },
  ];

  // Map the raw data to the format required by your Timeline component
  const formattedData = timelineData.map((item, index) => ({
    title: item.date,
    content: (
      <div className="flex flex-col gap-1 md:gap-2 pb-8" key={index}>
        <p className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
          {item.phase}
        </p>
        <p className="text-base sm:text-lg md:text-2xl font-medium text-neutral-600 dark:text-neutral-400">
          {item.event}
        </p>
      </div>
    ),
  }));

  return (
    <section className="w-full py-12 px-4 md:px-6">
      <div className="relative w-full mx-auto max-w-7xl" id="timeline">
        <BlurFade inView delay={0.2}>
          <Timeline data={formattedData} />
        </BlurFade>
      </div>
    </section>
  );
}
