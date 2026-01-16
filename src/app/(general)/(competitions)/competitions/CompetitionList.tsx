import { competitions } from "@/lib/competition";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Download } from "lucide-react";
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
                    {/* 2. Title and Logo Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mt-4">
                        
                        {/* Left Side: Typography */}
                        <div className="flex flex-col gap-2 md:gap-4">
                            {/* Abbreviation (Huge) */}
                            <h1 className="mx-auto md:mx-0 text-7xl md:text-9xl font-bold tracking-tighter text-white leading-none [font-family:var(--font-next-montserrat)]">
                                {competition.abbreviation}
                            </h1>
                            {/* Full Title */}
                            <h2 className="mx-auto text-center md:text-left text-3xl md:text-5xl font-bold text-white leading-tight [font-family:var(--font-next-montserrat)]">
                                {competition.title}
                            </h2>
                        </div>

                        {/* Right Side: The Logo Graphic */}
                        <div className="pb-5 relative w-60 mx-auto md:w-120 shrink-0 self-start md:self-center">
                            <Image
                                src={competition.logo} // This should be the colorful graphic logo
                                alt="Logo"
                                width={500}
                                height={300}
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* 3. Description Text */}
                    <p className="px-5 md:px-0 text-lg mt-5 md:text-xl text-gray-300 leading-relaxed max-w-4xl">
                        {competition.desc}
                    </p>

                    {/* 4. Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4">
                        {/* Guidebook Button */}
                        <Button
                            asChild
                            variant="secondary" // White background
                            size="lg"
                            className="rounded-lg text-base font-bold px-6 py-6"
                        >
                            {/*<Link href={competition.guideBook} target="_blank">
                                <span>Download Guidebook</span>
                                <Download className="ml-2 size-5" />
                            </Link>*/}
                        </Button>

                        {/* Register Button */}
                        <Button
                            asChild
                            variant="secondary" // White background
                            size="lg"
                            className="rounded-lg text-base font-bold px-6 py-6"
                            disabled={
                                competition.startRegDate1 > currentDate ||
                                competition.endRegDate3 < currentDate
                            }
                        >
                            {competition.startRegDate1 > currentDate ? (
                                <span className="cursor-not-allowed opacity-50 flex items-center gap-2">
                                    Coming Soon <Clock className="size-5" />
                                </span>
                            ) : competition.endRegDate3 < currentDate ? (
                                <span className="cursor-not-allowed opacity-50">
                                    Registration Closed
                                </span>
                            ) : (
                                <Link href={`/dashboard/competitions`} prefetch className="flex items-center gap-2">
                                    <span>Register Now</span>
                                    <ChevronRight className="size-5" />
                                </Link>
                            )}
                        </Button>
                    </div>
                </BlurFade>
            ))}
        </div>
    );
}
