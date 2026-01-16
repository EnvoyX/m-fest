import { competitions } from "@/lib/competition";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { currentDate } from "@/lib/utils";

export default function CompetitionsList() {
    return (
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
            <BlurFade inView delay={0.2}>
                <h1 className="text-center text-5xl lg:text-6xl font-bold">
                    Competitions
                </h1>
            </BlurFade>
            {competitions.map((competition, index) => (
                <BlurFade key={index} inView delay={0.2}>
                    <div
                        id={`${competition.abbreviation.toLowerCase()}`}
                        className="flex flex-col gap-10 mt-32"
                    >
                        <Image
                            className="rounded-(--radius)"
                            src={competition.logo}
                            alt={competition.title}
                            height={2747}
                            width={1545}
                            loading="lazy"
                        />
                        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                            <div className="text-3xl flex flex-col gap-8">
                                <h2>{competition.title}</h2>
                                <h1 className="text-7xl font-bold">
                                    {competition.abbreviation}
                                </h1>
                            </div>
                            <div className="space-y-6">
                                <p>{competition.desc}</p>

                                <div className="flex items-center gap-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="gap-1 pr-1.5"
                                    >
                                        <Link
                                            href={competition.guideBook}
                                            target="_blank"
                                        >
                                            <span>Guidebook</span>
                                            <ChevronRight className="size-2" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="default"
                                        size="sm"
                                        className="gap-1 pr-1.5"
                                        disabled={
                                            competition.startRegDate1 >
                                                currentDate ||
                                            competition.endRegDate3 <
                                                currentDate
                                        }
                                    >
                                        {competition.startRegDate1 >
                                        currentDate ? (
                                            <Link
                                                href={`/`}
                                                className="bg-white/50 cursor-not-allowed pointer-events-none"
                                            >
                                                <span>Coming Soon</span>
                                                <Clock className="size-4" />
                                            </Link>
                                        ) : competition.endRegDate3 <
                                          currentDate ? (
                                            <Link
                                                href={`/`}
                                                className="bg-white/50 cursor-not-allowed pointer-events-none"
                                            >
                                                <span>Registration Closed</span>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/dashboard/competitions`}
                                                prefetch
                                            >
                                                <span>Register Now</span>
                                                <ChevronRight className="size-2" />
                                            </Link>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </BlurFade>
            ))}
        </div>
    );
}
