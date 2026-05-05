import { isAfter, isBefore, isWithinInterval } from 'date-fns';
import { ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getCurrentDate, wibToUTC } from '@/lib/utils';

/*export default function ComingSoon() {
   return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-trasnparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border-2 shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)] py-4">
        <h1 className="text-center text-4xl lg:text-6xl font-bold">
          COMING SOON
        </h1>
      </div>
    </section>
  );
}*/

export default function MExpoPage() {
  const currentDate = getCurrentDate();
  const startRegDate = wibToUTC(new Date('2026-05-01T15:00:00'));
  const endRegDate = wibToUTC(new Date('2026-05-09T15:00:00'));

  return (
    <main className="text-white min-h-screen flex justify-center pt-10 md:pt-20 py-10 px-4 font-sans overflow-x-hidden">
      <div className="w-full max-w-5xl space-y-16">
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">M-Expo</h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
              Engineering Tomorrow:
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300">
              Innovation, Industry, and Impact
            </p>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-gray-600 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"
              alt="Expo Crowd"
              className="w-full h-56 md:h-auto object-cover grayscale opacity-90"
            />
          </div>

          <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 space-y-6 leading-relaxed text-justify md:text-left">
            <p>
              Ever imagine how your ideas transforms into future solutions? Are you ready to witness
              the synergy between student innovations and global industry technology?
            </p>
            <p>
              In M-Expo 2026, you aren't simply a bystander -{' '}
              <strong className="text-white">YOU</strong> are part of the ecosystem building
              Indonesia's future!
            </p>
          </div>

          <div className="p-6 rounded-xl md:bg-transparent md:p-0 md:border-none">
            <div className="flex flex-col md:flex-row text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 gap-2 md:gap-0">
              <span className="w-full md:w-[50%]">Day-1 : Friday, May 8th 2026</span>
              <span>09:00 - 16:30</span>
            </div>
            <div className="flex flex-col md:flex-row text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 gap-2 md:gap-0">
              <span className="w-full md:w-[50%]">Day-2 : Saturday, May 9th 2026</span>
              <span>09:00 - 15:00</span>
            </div>
            <div className="text-3xl md:text-5xl font-extrabold text-white">100% FREE</div>
          </div>

          <div className="space-y-6 pt-8">
            <h2 className="text-4xl md:text-6xl font-bold">What We Got</h2>
            <div className="space-y-8 text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
              <div>
                <strong className="text-white block mb-2">Exhibition:</strong>
                Explore newest innovation from many different well known companies as well as from
                ITB Mechanical Engineering students!
              </div>
              <div>
                <strong className="text-white block mb-2">Company Session:</strong>
                Consult career, apprenticeship, and job vacancies exclusive directly from the
                source!
              </div>
              <p className="text-gray-400 italic text-lg md:text-xl mt-4">
                We also got <strong className="text-white">
                  free ice cream and photobooth
                </strong>{' '}
                available!
              </p>
            </div>

            <div className="flex justify-center">
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
                  <span className="cursor-not-allowed opacity-50">Registration Closed</span>
                ) : (
                  <Link href="/dashboard/events/register/M-EXPO">
                    <span className="flex">
                      Register Now <ChevronRight className="size-5 my-auto" />{' '}
                    </span>
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/*<section className="space-y-8 pt-8 md:pt-12">
          <h1 className="text-4xl md:text-7xl font-bold text-center">Floor Plan</h1>
          
          <div className="w-full rounded-xl overflow-hidden border-2 border-gray-600 bg-black shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
              alt="Floor Plan Map" 
              className="w-full h-56 md:h-auto object-cover opacity-60" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg md:text-xl lg:text-2xl text-gray-300">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="font-bold text-white mr-3 min-w-[30px]">{i + 1}.</span> 
                Landmark {i % 5 + 1}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`h-10 md:h-12 w-full rounded-md bg-gray-500 opacity-50`}></div>
            ))}
          </div>
        </section>*/}

        <section className="space-y-8 pt-8 md:pt-12">
          <h1 className="my-8 text-4xl md:text-7xl font-bold flex items-center justify-center gap-2 text-center">
            Companies in Our Expo
          </h1>

          <div className="space-y-8 md:space-y-10">
            <CompanyItem
              name="Azzura"
              desc="Azzura refers to companies operating under the Azzura name, commonly associated with industrial services such as engineering, maintenance, inspection, and technical support. Depending on the specific entity, Azzura companies typically support sectors like oil and gas, manufacturing, and infrastructure through specialized technical solutions."
              bgurl="/sponsors/logo_sponsor/azzura.png"
            />
            <CompanyItem
              name="PT. Gexcon Indonesia"
              desc="Gexcon is an international engineering and consulting company specializing in risk management, explosion safety, and computational fluid dynamics (CFD). It provides advanced simulation software and technical advisory services to industries such as oil and gas, hydrogen energy, and process industries to improve safety and mitigate operational risks."
              bgurl="/sponsors/logo_sponsor/gexcon.PNG"
            />
            <CompanyItem
              name="Palapa Inspeksi"
              desc="Palapa Inspeksi (PT Inspeksi Mobil Jogja) is an Indonesian inspection service provider specializing in vehicle inspection and condition assessment. The company offers professional evaluation services for used cars, helping customers verify technical conditions, safety, and overall vehicle quality before purchase."
              bgurl="/sponsors/logo_sponsor/inspeksi.png"
            />
            <CompanyItem
              name="Komatsu Group Indonesia"
              desc="Komatsu is a Japanese multinational corporation that manufactures construction, mining, and industrial equipment. It is one of the world’s leading producers of heavy machinery, including excavators, bulldozers, and dump trucks. The company emphasizes innovation, automation, and sustainability in heavy equipment solutions."
              bgurl="/sponsors/logo_sponsor/komatsu.png"
            />
            <CompanyItem
              name="United Tractors"
              desc="United Tractors is a leading Indonesian company and a subsidiary of Astra International. Established in 1972, it operates in multiple sectors including heavy equipment distribution, mining contracting, coal and gold mining, and energy. The company is the exclusive distributor of Komatsu equipment in Indonesia and plays a major role in the country’s mining and construction industries."
              bgurl="/sponsors/logo_sponsor/ut.png"
            />
            <CompanyItem
              name="PT. Pupuk Kalimantan Timur"
              desc="Pupuk Kalimantan Timur (Pupuk Kaltim) is a state-owned fertilizer manufacturer based in Bontang, Indonesia. Established in 1977, the company produces ammonia, urea, and NPK fertilizers and plays a key role in supporting agricultural productivity across Southeast Asia. It operates multiple large-scale production plants and is part of the Pupuk Indonesia holding group."
              bgurl="/sponsors/logo_sponsor/pkt.png"
            />
            <CompanyItem
              name="PT. Nederman Indonesia"
              desc="Nederman is a global environmental technology company headquartered in Sweden. It specializes in industrial air filtration and resource management solutions designed to reduce emissions, improve workplace safety, and enhance production efficiency. Nederman serves industries such as manufacturing, metalworking, and energy by providing systems for dust, smoke, and fume extraction."
              bgurl="/sponsors/logo_sponsor/nederman.png"
            />
            <CompanyItem
              name="Unilever"
              desc="Unilever is a British-Dutch multinational corporation and one of the world’s largest consumer goods companies. It produces a wide range of products including food, beverages, cleaning agents, and personal care items. With operations in over 190 countries, Unilever focuses on sustainability and innovation while managing well-known global brands."
              bgurl="/sponsors/logo_sponsor/unilever.png"
            />
            <CompanyItem
              name="Pertamina EP & SKK Migas"
              desc="Pertamina EP is a subsidiary of Pertamina, responsible for upstream oil and gas exploration and production activities in Indonesia. It manages extensive working areas and operates multiple oil and gas fields across the country. SKK Migas (Special Task Force for Upstream Oil and Gas Business Activities) is the Indonesian government body that regulates and supervises upstream oil and gas operations, ensuring efficient resource management and compliance with national policies."
              bgurl="/sponsors/logo_sponsor/pertaminaep.png"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function CompanyItem({ name, bgurl, desc }: { name: string; bgurl: string; desc: string }) {
  return (
    <div className="flex max-sm:flex-col justify-between items-center gap-6 group p-4 rounded-xl hover:bg-white/5 transition-colors">
      <div className="w-28 h-28 md:w-40 md:h-40 rounded-lg shrink-0 border border-gray-500 bg-white flex items-center justify-center overflow-hidden p-2 ">
        <img src={bgurl} alt={`${name} logo`} className="w-full h-full py-auto object-contain" />
      </div>
      <div className="space-y-2 flex-1">
        <h3 className="text-2xl md:text-4xl font-bold text-white">{name}</h3>
        <p className="text-xl md:text-2xl text-gray-300 leading-snug text-justify">{desc}</p>
      </div>
    </div>
  );
}
