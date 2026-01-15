import { events } from "@/lib/event";
import Link from "next/link";
import Image from "next/image";

export default function ContentSection() {
  return (
    // 1. min-h-[100dvh]: Fits mobile screens perfectly (handling address bars)
    // 2. flex flex-col justify-end: Pushes content to the bottom naturally
    <section className="grayscale mask-b-from-90% mask-b-to-100% relative min-h-[110dvh] w-full overflow-hidden bg-black flex flex-col justify-end pb-12 md:pb-32">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/events/events-hero.jpg"
          alt="Events Hero Background"
          fill
          className="object-cover object-center blur-sm opacity-30"
          priority
        />
        {/* Optional: Gradient to make text readable at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      {/* Mobile: Centered text, padding on sides (px-6) */}
      {/* Desktop: Right aligned (md:text-right), padding on right (md:pr-20) */}
      <div className="relative z-10 w-full px-6 md:pr-20 md:pl-0 flex flex-col items-center md:items-end">
        
        <div className="w-full max-w-4xl text-center md:text-right">
          <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-7xl drop-shadow-xl text-white [font-family:var(--font-next-montserrat)]">
            Participate in our events!
          </h2>
          
          <p className="mb-6 text-lg italic font-light text-gray-300 md:mb-8 md:text-2xl">
            A cornucopia of choices to quench your interests
          </p>
          
          {/* md:ml-auto pushes this specific paragraph to the right on desktop */}
          <p className="max-w-xl text-base leading-relaxed text-gray-200 md:text-xl md:ml-auto">
            Join us in our events to experience the world of mechanical engineering, and learn from the best.
          </p>
        </div>

      </div>
    </section>
  );
}