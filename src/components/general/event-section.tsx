import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import EventCard from "./eventcard";
import { events } from "@/lib/event";
import type { Variants } from "framer-motion";
import { BlurFade } from "../ui/blur-fade";

const transitionVariants: { item: Variants } = {
    item: {
        hidden: {
            opacity: 0,
            filter: "blur(12px)",
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

export default function EventSection() {
    return (
        <section className="py-24 px-6 md:py-40 md:px-12 lg:px-24">
            <div>
                <BlurFade inView delay={0.2}>
                    <h1 className="text-left text-5xl md:text-7xl lg:mt-16 [font-family:var(--font-next-montserrat)] font-bold mb-5 leading-tight">
                        {`What's the big deal?`}
                    </h1>
                </BlurFade>

                <BlurFade inView delay={0.2}>
                    <span className="mt-6 md:mt-10 text-lg md:text-xl font-bold w-full md:w-4/5 leading-relaxed text-white [font-family:var(--font-next-montserrat)] block">
                        We got plenty of events, go paint the town red!
                    </span>
                </BlurFade>
            </div>

            <BlurFade inView delay={0.2}>
                <div className="flex justify-center">
                    <h1 className="text-5xl md:text-9xl font-bold mt-10 md:mt-20 text-white [font-family:var(--font-next-montserrat)] text-center">
                        Events
                    </h1>
                </div>
            </BlurFade>

            <div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6  gap-6 md:gap-6 lg:gap-10 mt-10 md:mt-20">
                {events.map((event, index) => (
                    <BlurFade inView delay={0.2 + index * 0.1} key={index}>
                        <EventCard
                            href={event.href}
                            title={event.title}
                            imageSrc={event.img}
                            Icon={event.logo}
                        />
                    </BlurFade>
                ))}
            </div>
            <BlurFade inView delay={0.2}>
                <div className="flex justify-center mt-12 md:mt-20 w-full">
                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.75,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}
                        className="w-full md:w-auto flex justify-center"
                    >
                        <div key={1} className="w-full md:w-auto">
                            <Button
                                asChild
                                size="lg"
                                className="drop-shadow-xl/50 w-full md:w-72 group relative overflow-hidden bg-slate-900/30 hover:bg-slate-800/50 backdrop-blur-md border border-white/20 text-white rounded-xl px-6 py-6 text-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            >
                                <Link
                                    href="/events"
                                    className="flex items-center justify-center gap-3"
                                    prefetch
                                >
                                    <span className="text-nowrap text-2xl md:text-3xl">
                                        Explore Events
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </AnimatedGroup>
                </div>
            </BlurFade>
        </section>
    );
}
