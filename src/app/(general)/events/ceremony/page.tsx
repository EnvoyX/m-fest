export default function CeremonyPage() {
  const lineup = [
    {
      id: 1,
      name: "Teto",
      image: "/",
    },
    {
      id: 2,
      name: "Miku",
      image: "/",
    },
    {
      id: 3,
      name: "Neru",
      image: "/",
    },
  ];

  return (
    <main className="text-white min-h-screen flex justify-center py-12 lg:py-20 px-4 font-sans overflow-x-hidden">
      <div className="w-full max-w-6xl space-y-16 lg:space-y-20">
        
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">Ceremony</h1>
          
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200">
              Engineering Tomorrow:
            </h2>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mt-2">
              
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#C09000] bg-clip-text text-transparent -[ -webkit-text-stroke:0.5px_rgba(255,255,255,0.5) ]">
                The Golden Lap   
              </span>
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#C09000] bg-clip-text text-transparent -[ -webkit-text-stroke:0.5px_rgba(255,255,255,0.5) ]">
                 : Honoring the Journey
              </span>
            </h3>
          </div>
        </div>

        <div className="w-full max-w-[925px] mx-auto rounded-xl overflow-hidden border border-gray-600 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" 
            alt="Ceremony Stage" 
            className="w-full h-auto object-cover grayscale opacity-90"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-10">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
            The Awarding night for the winners of each Mechanical Festival 2026 competitions. A token of appreciation from us for their achievement and innovation, featuring guest stars and exclusive gala dinner.
          </p>

          <div className="space-y-4 p-6 border-y border-gray-700/50">
            <p className="font-bold text-white text-2xl md:text-3xl uppercase tracking-wide">
              INVITATION ONLY
            </p>
            <p className="font-bold text-white text-2xl md:text-3xl">
              Dress Code: <span className="tracking-widest text-gray-400">-----</span>
            </p>
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 lg:mb-16">
            Actress Line-up
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto">
            {lineup.map((actress) => (
              <div key={actress.id} className="flex flex-col items-center group">
                <div className="w-full aspect-[3/4] rounded-xl border border-gray-600 overflow-hidden mb-6 bg-gray-800 relative shadow-lg">
                  <img
                    src={actress.image}
                    alt={actress.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <p className="font-bold text-3xl md:text-4xl tracking-wide">{actress.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}