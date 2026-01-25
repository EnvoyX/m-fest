export default function MExpoPage() {
  return (
    <main className="text-white min-h-screen flex justify-center pt-10 md:pt-20 py-10 px-4 font-sans">
      <div className="w-full max-w-4xl space-y-12">
        
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight">M-Expo</h1>
            <h2 className="text-lg md:text-xl font-semibold text-gray-200">Engineering Tomorrow:</h2>
            <p className="text-base md:text-lg font-medium text-gray-300">Innovation, Industry, and Impact</p>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-gray-600">
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" 
              alt="Expo Crowd" 
              className="w-full h-48 md:h-auto object-cover grayscale opacity-90"
            />
          </div>

          <div className="text-sm md:text-xl text-gray-300 space-y-4 leading-relaxed">
            <p>
              Ever imagine how your ideas transforms into future solutions? Are you ready to witness the synergy between student innovations and global industry technology? <br className="hidden md:block"/>
              In M-Expo 2026, you aren't simply a bystander - <strong className="text-white">YOU</strong> are part of the ecosystem building Indonesia's future!
            </p>
          </div>

          <div className="bg-[#252538] p-4 rounded-lg md:bg-transparent md:p-0">
            <div className="flex flex-col md:flex-row text-sm md:text-xl font-bold text-white mb-2 md:mb-1 gap-1 md:gap-0">
              <span className="w-full md:w-[40%]">Day-1 : Friday, May 8th 2026</span>
              <span>09:00-16:30</span>
            </div>
            <div className="flex flex-col md:flex-row text-sm md:text-xl font-bold text-white mb-4 md:mb-3 gap-1 md:gap-0">
              <span className="w-full md:w-[40%]">Day-2 : Saturday, 9 May 9th 2026</span>
              <span>09:00-16:30</span>
            </div>
            <div className="text-xl md:text-3xl font-extrabold text-white">100% FREE</div>
          </div>

          <div className="space-y-3 pt-5">
            <h2 className="text-3xl md:text-5xl font-bold">What We got</h2>
            <div className="space-y-4 text-sm md:text-xl text-gray-300">
              <p>
                <strong className="text-white block mb-1">Exhibition:</strong> 
                Explore newest innovation from many different well known companies as well as from ITB Mechanical Engineering students!
              </p>
              <p>
                <strong className="text-white block mb-1">Company Session:</strong> 
                Consult career, apprenticeship and job vacancies exclusive directly from the source!
              </p>
              <p>
                <strong className="text-white block mb-1">Networking:</strong> 
                Build relation with the experts and young prodigies in technology. Prepare yourself to step further, broaden your vision and find unlimited career potential!
              </p>
              <p className="text-gray-400 italic text-xs md:text-base mt-2">
                We also got <strong className="text-white">free icecream and photobooth</strong> available!
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-6 md:pt-10">
          <h1 className="text-3xl md:text-7xl font-bold text-center">Floor Plan</h1>
          
          <div className="w-full rounded-xl overflow-hidden border-2 border-gray-600 bg-black">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
              alt="Floor Plan Map" 
              className="w-full h-48 md:h-auto object-cover opacity-60" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-base">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>
                <span className="font-bold text-white mr-2">{i + 1}.</span> 
                Landmark {i % 5 + 1}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
             {Array.from({ length: 16 }).map((_, i) => (
               <div key={i} className={`h-8 w-full rounded-sm bg-gray-400`}></div>
             ))}
          </div>
        </section>

        <section className="space-y-6 pt-6 md:pt-10">
          <h1 className="my-5 text-3xl md:text-7xl font-bold flex items-center justify-center gap-2 text-center">
            Company Session
          </h1>

          <div className="space-y-8 md:space-y-6">
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
    <div className="flex justify-between items-start gap-4 group">
      <div className="space-y-1 flex-1">
        <h3 className="text-lg md:text-xl font-bold">{name}</h3>
        <p className="text-sm md:text-xl text-gray-400 leading-tight">
          Deskripsi singkat perusahaan penjelasan session.
        </p>
      </div>
      {/* Fixed width for image so it doesn't squash, shrink-0 prevents flex shrinking */}
      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-md bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80 shrink-0"></div>
    </div>
  );
}