import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import CountdownEventClient from "@/components/general/Countdown-Event";
import { cn, getCurrentDate, wibToUTC } from "@/lib/utils";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import { Clock } from "lucide-react";


export default function MTalksPage() {
    const currentDate = getCurrentDate();
    const startRegDate = wibToUTC(new Date("2026-05-01T15:00:00"));
    const endRegDate = wibToUTC(new Date("2026-05-09T15:00:00"));
    const mTalksInfo = [
        {
            day: "Day 1",
            topic: "Topic 1",
            date: "Friday, May 8th 2026",
            dateValue: new Date("2026-05-08T00:00:00"),
            synopsis: "Synopsis 1",
            speakers: [
                {
                    id: 1,
                    name: "Ryan Aditya",
                    role: "VP Non Rig Services Operation Pertamina Drilling Services Indonesia",
                    image: "/events/m-talks/Ryan_New.png",
                    session: "Session 1"
                },
                {
                    id: 2,
                    name: "Mochamad Safarudin, S.T., M.T. ",
                    role: "Country Manager and Principal Engineer at GEXCON Indonesia",
                    image: "/events/m-talks/Pak Andi.jpg",
                    session: "Session 2"
                },
                {
                    id: 3,
                    name: "Bintang Kurniadi, S.T.",
                    role: "Senior Engineer at GEXCON Indonesia",
                    image: "/events/m-talks/Mas Bintang.jpg",
                    session: "Session 2"
                },
            ]
        },
        {
            day: "Day 2",
            topic: "Topic 2",
            date: "Saturday, May 9th 2026",
            dateValue: new Date("2026-05-09T00:00:00"),
            synopsis: "Synopsis 2",
            speakers: [
                {
                    id: 1,
                    name: "Achmad Rizal Roesindrawan",
                    role: "Direktur Corporate Business Development PT Energia Prima Nusantara",
                    image: "/events/m-talks/Achmad.jpg",
                    session: "Session 1"
                },
                {
                    id: 2,
                    name: "Zahid Azmi Ibrahim ",
                    role: "Content Creator ( Tiktok, Instagram, Youtube )",
                    image: "/events/m-talks/Zahid_1.jpg",
                    session: "Session 2"
                }
            ]
        }
    ]


    return (
        <div className="min-h-screen text-white w-full overflow-x-hidden">
            <header className="pt-20 py-12 lg:py-16 w-full px-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center pb-8 lg:pb-16">
                    M-Talks
                </h1>

                <div className="mx-auto w-full max-w-231.25 h-auto rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                    <img
                        src="/events/m-talks/M-TALKS_BANNER.png"
                        alt="Event Stage"
                        className="w-full h-auto object-cover grayscale opacity-80 transition duration-500"
                    />
                </div>

                <div className="max-w-4xl mx-auto mt-12 text-center space-y-8">
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                        Automation, digital simulation, and the energy transition are reshaping how engineers work and how industries evolve. In this changing landscape, engineers must not only master technology, but also adapt, lead, and stay resilient.
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                        For two days, this talkshow brings together Transformative Engineering and Beyond Limits to explore industrial transformation and the mindset needed to remain relevant and impactful.
                    </p>

                    <div className="pt-4 font-semibold text-xl md:text-2xl lg:text-3xl text-white space-y-2 max-sm:hidden">
                        <p>Day 1 - Friday, May 8th 2026 (Auditorium CC Timur)</p>
                        <p>Day 2 - Saturday, May 9th 2026 (Auditorium CC Timur)</p>
                    </div>

                    <div className="pt-4 font-semibold text-xl md:text-2xl lg:text-3xl text-white space-y-2 sm:hidden">
                        <p className="flex flex-col items-center">
                            <span>Day 1</span>
                            <span> Friday, May 8th 2026 (Aula Timur)</span>
                        </p>

                        <p className="flex flex-col items-center">
                            <span>Day 2 </span>
                            <span>Saturday, May 9th 2026 (Aula Timur)</span>
                        </p>

                    </div>
                </div>
            </header>
            <main>
                {mTalksInfo.map((info) => {
                    return (
                        <section key={info.day}>
                            <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-8">
                                <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-8 lg:mb-12 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
                                    <span>{info.day}</span>
                                    {/*<span className="hidden md:inline">-</span>
                                    <span>{info.topic}</span>*/}
                                </h2>

                                <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 mb-12">
                                    {info.speakers.map((speaker) => (
                                        <div key={speaker.id} className="flex flex-col items-center flex-1">
                                            <div className={cn("w-full max-w-xs sm:max-w-sm md:max-w-md  aspect-3/4 rounded-lg border border-gray-600 overflow-hidden mb-5 bg-gray-800 shadow-sm"
                                            )}>
                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    className={cn("w-full h-full object-cover", {
                                                        "object-scale-down": speaker.name === "Gexcon"
                                                    })}
                                                />
                                            </div>
                                            <p className="text-md md:text-lg text-slate-400 text-center">{speaker.session}</p>
                                            <p className="font-bold text-2xl md:text-3xl mb-1 text-center">{speaker.name}</p>
                                            <p className="text-lg md:text-xl text-gray-400 text-center">{speaker.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 lg:pt-16 px-4 pb-16">
                                <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">

                                    <CountdownEventClient date={info.dateValue} />
                                    <div className="text-center space-y-6">
                                        <span className="text-2xl md:text-3xl font-bold block text-white">Friday, May 8th 2026</span>
                                        {/*<p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto wrap-break-word leading-relaxed">
                                            {info.synopsis}
                                        </p>*/}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}
                <div className="flex flex-col items-center gap-2">
                    <span className="italic text-sm text-gray-400 text-center">Max quota 100 participants per session</span>
                    <div className="flex justify-center pb-20">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-xl text-base object-fill md:text-lg font-bold px-8 py-6 md:px-10 md:py-8 shadow-lg"
                            disabled={
                                !isWithinInterval(currentDate, {
                                    start: startRegDate,
                                    end: endRegDate,
                                })
                            }
                        >
                            {isBefore(currentDate, startRegDate) ? (
                                <span className="cursor-not-allowed opacity-50 flex items-center gap-2">
                                    Coming Soon <Clock className="size-5" />
                                </span>
                            ) : isAfter(currentDate, endRegDate) ? (
                                <span className="cursor-not-allowed opacity-50">
                                    Registration Closed
                                </span>
                            ) : (
                                <Link href="/dashboard/events/register/M-TALKS">
                                    <span className="flex">
                                        Register Now <ChevronRight className="size-5 my-auto" />{" "}
                                    </span>
                                </Link>
                            )}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}