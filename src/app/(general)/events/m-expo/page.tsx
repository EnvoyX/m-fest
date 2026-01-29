import { Button } from "@/components/ui/button"; // Assuming you might need buttons later, keeping imports clean

export default function MExpoPage() {
  return (
    <main className="text-white min-h-screen flex justify-center pt-10 md:pt-20 py-10 px-4 font-sans overflow-x-hidden">
      <div className="w-full max-w-5xl space-y-16">
        
        {/* --- Hero Section --- */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">M-Expo</h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">Engineering Tomorrow:</h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300">Innovation, Industry, and Impact</p>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-gray-600 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" 
              alt="Expo Crowd" 
              className="w-full h-56 md:h-auto object-cover grayscale opacity-90"
            />
          </div>

          {/* Description - Scaled to match MCare Body Text */}
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-300 space-y-6 leading-relaxed text-justify md:text-left">
            <p>
              Ever imagine how your ideas transforms into future solutions? Are you ready to witness the synergy between student innovations and global industry technology?
            </p>
            <p>
              In M-Expo 2026, you aren't simply a bystander - <strong className="text-white">YOU</strong> are part of the ecosystem building Indonesia's future!
            </p>
          </div>

          {/* Date & Time Box */}
          <div className="p-6 rounded-xl md:bg-transparent md:p-0 md:border-none">
            <div className="flex flex-col md:flex-row text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 gap-2 md:gap-0">
              <span className="w-full md:w-[50%]">Day-1 : Friday, May 8th 2026</span>
              <span>09:00 - 16:30</span>
            </div>
            <div className="flex flex-col md:flex-row text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 gap-2 md:gap-0">
              <span className="w-full md:w-[50%]">Day-2 : Saturday, May 9th 2026</span>
              <span>09:00 - 16:30</span>
            </div>
            <div className="text-3xl md:text-5xl font-extrabold text-white">100% FREE</div>
          </div>

          {/* "What We Got" Section */}
          <div className="space-y-6 pt-8">
            <h2 className="text-4xl md:text-6xl font-bold">What We Got</h2>
            <div className="space-y-8 text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
              <div>
                <strong className="text-white block mb-2">Exhibition:</strong> 
                Explore newest innovation from many different well known companies as well as from ITB Mechanical Engineering students!
              </div>
              <div>
                <strong className="text-white block mb-2">Company Session:</strong> 
                Consult career, apprenticeship and job vacancies exclusive directly from the source!
              </div>
              <div>
                <strong className="text-white block mb-2">Networking:</strong> 
                Build relation with the experts and young prodigies in technology. Prepare yourself to step further, broaden your vision and find unlimited career potential!
              </div>
              <p className="text-gray-400 italic text-lg md:text-xl mt-4">
                We also got <strong className="text-white">free ice cream and photobooth</strong> available!
              </p>
            </div>
          </div>
        </section>

        {/* --- Floor Plan Section --- */}
        <section className="space-y-8 pt-8 md:pt-12">
          <h1 className="text-4xl md:text-7xl font-bold text-center">Floor Plan</h1>
          
          <div className="w-full rounded-xl overflow-hidden border-2 border-gray-600 bg-black shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
              alt="Floor Plan Map" 
              className="w-full h-56 md:h-auto object-cover opacity-60" 
            />
          </div>

          {/* Landmarks Grid - Increased text size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg md:text-xl lg:text-2xl text-gray-300">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="font-bold text-white mr-3 min-w-[30px]">{i + 1}.</span> 
                Landmark {i % 5 + 1}
              </div>
            ))}
          </div>

          {/* Decorative Grid Boxes */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`h-10 md:h-12 w-full rounded-md bg-gray-500 opacity-50`}></div>
            ))}
          </div>
        </section>

        {/* --- Company Session Section --- */}
        <section className="space-y-8 pt-8 md:pt-12">
          <h1 className="my-8 text-4xl md:text-7xl font-bold flex items-center justify-center gap-2 text-center">
            Company Session
          </h1>

          <div className="space-y-8 md:space-y-10">
            <CompanyItem name="Nama Company" />
            <CompanyItem name="Nama Company" />
          </div>
        </section>

      </div>
    </main>
  );
}

function CompanyItem({ name }: { name: string }) {
  return (
    <div className="flex justify-between items-start gap-6 group p-4 rounded-xl hover:bg-white/5 transition-colors">
      <div className="space-y-2 flex-1">
        {/* Increased Company Name Size */}
        <h3 className="text-2xl md:text-4xl font-bold text-white">{name}</h3>
        {/* Increased Description Size */}
        <p className="text-xl md:text-2xl text-gray-300 leading-snug">
          Deskripsi singkat perusahaan penjelasan session.
        </p>
      </div>
      {/* Fixed width for image so it doesn't squash */}
      <div className="w-28 h-28 md:w-40 md:h-40 bg-gray-600 rounded-lg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80 shrink-0 border border-gray-500"></div>
    </div>
  );
}