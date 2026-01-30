import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function ETUPages() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="py-12 lg:py-16 w-full px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
          M-Run
        </h1>
        <Image
          src="/mrunimage1.png"
          alt="mrunimage1"
          height={1378}
          width={926}
          className="mx-auto pt-8 pb-5 w-full max-w-[926px] h-auto"
        />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 mt-8">
          <h1 className="text-lg md:text-xl lg:text-2xl leading-relaxed">
            Ever felt your heart pounding like a powerful engine, your breath
            flowing like a perfectly tuned air intake system, and your legs
            driving you forward like a high-performance transmission?
          </h1>
          <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">
            At M-RUN 2026, you’re not just running—you’re operating as the most
            advanced biological machine ever built: YOURSELF.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center pb-12">
        <h1 className="text-lg md:text-xl lg:text-2xl">The race will be on going on</h1>
        <h1 className="text-3xl md:text-5xl font-bold mt-2">From now, that is roughly</h1>
      </div>

      <div className="py-12 lg:py-16">
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-bold px-4 leading-tight">
          With the Grand Prize Totalling...
        </h1>
        <div className="w-full px-4">
          <Image
            src="/mrunimage2.png"
            alt="mrunimage2"
            height={1000}
            width={4000}
            className="py-8 lg:py-16 w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl pb-8 lg:pb-12 font-semibold">
          Other Information
        </h1>
        <div className="space-y-4 text-lg md:text-xl lg:text-2xl">
          <p>Distance: 5km</p>
          <p>Route: Institut Teknologi Bandung</p>
          <p>Facility:</p>
          <ul className="space-y-3 list-disc list-inside ml-2 md:ml-5">
            <li>M-Run 2026 Jersey</li>
            <li>Finisher Medal</li>
            <li>BIB</li>
            <li>Refreshments</li>
            <li>Doorprize Coupon</li>
          </ul>
        </div>
      </div>

      <div className="py-16 px-4 text-center">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl">Ready to operate at</h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">full throttle?</h1>
        </div>
        <Image
          src="/mrunimage3.png"
          alt="mrunimage3"
          width={1000}
          height={467}
          className="mx-auto w-full max-w-[1000px] h-auto"
        />
      </div>

      <div className="flex justify-center pb-16">
        <Link href="/#">
          <Button 
          size="lg"
          className="rounded-xl text-lg md:text-xl font-bold px-10 py-6 md:px-12 md:py-8 shadow-lg"
          >
            Register Now <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="px-4 pb-8">
        <Image
          src="/mruntimeline.png"
          alt="mruntimeline"
          height={600}
          width={1200}
          className="mx-auto w-full max-w-[1200px] h-auto"
        />
      </div>
    </div>
  );
}