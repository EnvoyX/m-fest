import { Button } from "@/components/ui/button";
import { events } from "@/lib/event";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "../ui/blur-fade";

export default function EventsSection() {
    return (
        <section className="py-16 md:py-32" id="events">
            <div className="mx-auto max-w-5xl px-6 md:space-y-12">
                <BlurFade inView delay={0.2}>
                    <h1 className="text-center text-6xl font-bold">Events</h1>
                </BlurFade>
                {events.map((event, index) => (
                    <BlurFade key={index} delay={0.2} inView>
                        <div
  id={event.title.toLowerCase()}
  className="flex flex-col md:grid md:grid-cols-2 gap-10 mt-32"
>
  {/* Left Side: Image */}
  <Image
    className="my-auto rounded-[var(--radius)] object-cover grayscale w-full h-auto"
    src={event.img}
    alt={event.title}
    height={2747}
    width={1545}
    loading="lazy"
  />

  {/* Right Side: Content */}
  <div className="flex flex-col justify-center gap-6">
    
    {/* Title */}
    <h2 className="text-4xl font-medium">
      {event.title}
    </h2>

    {/* Description & Logo Row */}
    {/* CHANGED: Switched from grid-cols-2 to flex-row to let text expand */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Text: Added flex-1 to make it take up available width */}
      <span className="text-lg md:text-2xl leading-relaxed flex-1">
        {event.desc}
      </span>

      {/* Logo: Added shrink-0 so it doesn't get squashed, removed ml-[70%] */}
      <div className="shrink-0">
        <Image
          src={event.logo}
          width={100}
          height={100}
          alt="Event Logo"
          className="object-contain"
        />
      </div>
    </div>

    {/* Button */}
    {/* Moved alignment to start (left) or keep centered based on preference */}
    <Button
      asChild
      variant="secondary"
      size="sm"
      className="bg-white mt-2 w-fit gap-1 pr-1.5 hover:bg-white/75"
    >
      <Link
        href={`/events/${event.title.toLowerCase().split(" ").join("-")}`}
      >
        <span className="text-black font-semibold">Learn More</span>
        <ChevronRight className="size-4 invert" />
      </Link>
    </Button>
  </div>
</div>
                    </BlurFade>
                ))}
            </div>
        </section>
    );
}
