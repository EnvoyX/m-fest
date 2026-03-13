import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { eventsList } from "@/lib/eventDashboard";
import { getCurrentDate } from "@/lib/utils";

{/*export default function ComingSoon() {
   return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-trasnparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border-2 shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)] py-4">
        <h1 className="text-center text-4xl lg:text-6xl font-bold">
          COMING SOON
        </h1>
      </div>
    </section>
  );
}*/}

const currentDate = getCurrentDate();
const startRegDate1: Date = eventsList.find(event => event.id === "M-RUN")?.startRegDate1;
const endRegDate1: Date = eventsList.find(event => event.id === "M-RUN")?.endRegDate1;
const startRegDate2: Date = eventsList.find(event => event.id === "M-RUN")?.Batch1StartRegDate;
const endRegDate2: Date = eventsList.find(event => event.id === "M-RUN")?.Batch1EndRegDate;

const isOpen = (currentDate >= startRegDate1 && currentDate <= endRegDate1) || (currentDate >= startRegDate2 && currentDate <= endRegDate2);

export default function ETUPages() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="py-12 lg:py-16 w-full px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
          M-Run
        </h1>
        <div className="mx-auto mb-3 text-center font-bold">Run Like a Machine! Unleash Your Biological Engine</div>
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

      <div className="py-12 lg:py-16">
        <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-bold px-4 leading-tight">
          With the Grand Prize Totalling...
        </h1>
        <div className="w-full px-4">
          <Image
            src="/prizepoolmrun.png"
            alt="mrunimage2"
            height={500}
            width={2000}
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
            <li>Prize Money (for Winners)</li>
            <li>M-Run 2026 Jersey</li>
            <li>Finisher Medal</li>
            <li>BIB</li>
            <li>Timing Chip</li>
            <li>Refreshments</li>
          </ul>
        </div>
      </div>

      <div className="py-16 px-4 text-center">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl">Ready to operate at</h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">full throttle?</h1>
        </div>
        <Image
          src="/reginfomrun.png"
          alt="mrunimage3"
          width={1000}
          height={467}
          className="mx-auto w-full max-w-[1000px] h-auto"
        />
      </div>

      <div className="flex justify-center pb-16">
          <Button 
            size="lg"
            disabled={!isOpen}
            className="rounded-xl text-lg md:text-xl font-bold px-10 py-6 md:px-12 md:py-8 shadow-lg w-fit"
          >
            {!isOpen ? (
              <span className="flex items-center gap-2 whitespace-nowrap">
                Register Now <ChevronRight className="h-6 w-6" />
              </span>
            ) : (
              <Link href="/dashboard/events/register/M-RUN/" className="flex items-center gap-2 whitespace-nowrap">
                Register Now <ChevronRight className="h-6 w-6" />
              </Link>
            )}
          </Button>
      </div>

      <div className="px-4 pb-8">
        <Image
          src="/mruntimelinefixbgt.png"
          alt="mruntimeline"
          height={600}
          width={1200}
          className="mx-auto w-full max-w-[1200px] h-auto"
        />
      </div>
    </div>
  );
}