/*import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";*/

export default function ComingSoon() {
   return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-trasnparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border-2 shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)] py-4">
        <h1 className="text-center text-4xl lg:text-6xl font-bold">
          COMING SOON
        </h1>
      </div>
    </section>
  );
}

/*export default function MTalksPage() {
  const speakers = [
    {
      id: 1,
      name: "Speaker 1",
      role: "Jabatan i guess",
      image: "https://i.pinimg.com/736x/8a/e7/7e/8ae77e8715886470377488055653457a.jpg",
    },
    {
      id: 2,
      name: "Speaker 2",
      role: "Jabatan i guess",
      image: "https://i.pinimg.com/originals/93/e6/f3/93e6f364377045df649f874559287313.jpg",
    },
    {
      id: 3,
      name: "Speaker 3",
      role: "Jabatan i guess",
      image: "https://i.pinimg.com/736x/07/35/65/0735654378f45a0544521477755866b0.jpg",
    },
  ];

  return (
    <main className="min-h-screen text-white w-full overflow-x-hidden">
      <div className="pt-20 py-12 lg:py-16 w-full px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center pb-8 lg:pb-16">
          M-Talks
        </h1>
        
        <div className="mx-auto w-full max-w-[925px] h-auto rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"
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

          <div className="pt-4 font-semibold text-xl md:text-2xl lg:text-3xl text-white space-y-2">
            <p>Day-1 : Friday, May 8th 2026 (Aula Timur)</p>
            <p>Day-2 : Saturday, May 9th 2026 (Aula Timur)</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-8">
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-8 lg:mb-12 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
          <span>Day-1</span>
          <span className="hidden md:inline">-</span>
          <span>Topik Speech</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="flex flex-col items-center">
              <div className="w-full aspect-[3/4] rounded-lg border border-gray-600 overflow-hidden mb-5 bg-gray-800 shadow-sm">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-bold text-2xl md:text-3xl mb-1">{speaker.name}</p>
              <p className="text-lg md:text-xl text-gray-400">{speaker.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-12 lg:pt-16 px-4 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
          
          <div className="flex items-end gap-3 justify-center scale-110 md:scale-125">
            <TimerBox value="4" label="Days" />
            <Separator />
            <TimerBox value="20" label="Hours" />
            <Separator />
            <TimerBox value="69" label="Minutes" />
          </div>
          
          <div className="text-center space-y-6">
             <span className="text-2xl md:text-3xl font-bold block text-white">Friday, May 8th 2026</span>
             <p className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto break-words leading-relaxed">
              Sinopsis speech hmmmmm yeyeye fuwa fuwa
              uwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-20">
        <Link href="/#">
          <Button 
            size="lg"
            className="rounded-xl text-lg md:text-xl font-bold px-10 py-6 md:px-12 md:py-8 shadow-lg"
          >
            Register Now <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </main>
  );
}

function TimerBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-2 border-gray-400 rounded-lg w-20 h-24 md:w-24 md:h-28 flex flex-col items-center justify-center bg-[#252538] text-white">
      <span className="text-3xl md:text-4xl font-bold">{value}</span>
      <span className="text-sm md:text-base text-gray-300">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col gap-1 pb-6 md:pb-8">
      <div className="w-2 h-2 bg-white rounded-full"></div>
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  );
}*/