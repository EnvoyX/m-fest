export default function CeremonyPage() {
  // Data for the lineup (Teto, Miku, Neru)
  const lineup = [
    {
      id: 1,
      name: "Teto",
      // Placeholder for Teto (Red hair)
      image: "https://i.pinimg.com/736x/8a/e7/7e/8ae77e8715886470377488055653457a.jpg",
    },
    {
      id: 2,
      name: "Miku",
      // Placeholder for Miku (Teal hair)
      image: "https://i.pinimg.com/originals/93/e6/f3/93e6f364377045df649f874559287313.jpg",
    },
    {
      id: 3,
      name: "Neru",
      // Placeholder for Neru (Yellow hair)
      image: "https://i.pinimg.com/736x/07/35/65/0735654378f45a0544521477755866b0.jpg",
    },
  ];

  return (
    <main className="bg-[#1c1c2e] text-white min-h-screen flex justify-center py-12 px-4 font-sans">
      <div className="w-full max-w-lg space-y-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">Ceremony</h1>
          
          <h2 className="text-xl font-medium text-gray-200">
            Engineering Tomorrow:
          </h2>
          
          {/* Gold Text Effect */}
          <h3 className="text-lg font-semibold">
            The <span className="text-[#eab308]">Golden Lap</span>: <span className="text-[#eab308]">Honoring the Journey</span>
          </h3>
        </div>

        {/* ================= HERO IMAGE ================= */}
        <div className="w-full rounded-xl overflow-hidden border border-gray-600 shadow-lg">
          {/* Grayscale band image */}
          <img 
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop" 
            alt="Ceremony Stage" 
            className="w-full h-64 object-cover grayscale opacity-90"
          />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="space-y-6 text-sm">
          <p className="text-gray-300 leading-relaxed">
            The Awarding night for the winners of each Mechanical Festival 2026 competitions. A token of appreciation from us for their achievement and innovation, featuring guest stars and exclusive gala dinner.
          </p>

          <div className="space-y-1">
            <p className="font-bold text-white text-base uppercase tracking-wide">INVITATION ONLY</p>
            <p className="font-bold text-white text-base">
              Dress Code: <span className="tracking-widest">-----</span>
            </p>
          </div>
        </div>

        {/* ================= LINE-UP SECTION ================= */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-6">Actress Line-up</h2>

          <div className="grid grid-cols-3 gap-4">
            {lineup.map((actress) => (
              <div key={actress.id} className="flex flex-col items-center group">
                {/* Image Container */}
                <div className="w-full aspect-[3/4] rounded-lg border border-gray-600 overflow-hidden mb-3 bg-gray-800 relative">
                  <img
                    src={actress.image}
                    alt={actress.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Optional: Add a subtle inner glow or overlay if desired */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                {/* Name */}
                <p className="font-bold text-sm tracking-wide">{actress.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}