export default function MTalksPage() {
  // Data for the speakers to make the code cleaner
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
    <main className="text-white min-h-screen flex justify-center py-10 px-4 pt-20">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl md:text-7xl font-bold text-center">M-Talks</h1>
        <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop"
            alt="Event Stage"
            className="w-full object-cover grayscale opacity-80 transition duration-500"
          />
        </div>

        <div className="text-base md:text-xl text-gray-300 space-y-4 leading-relaxed">
          <p>
            Automation, digital simulation, and the energy transition are reshaping how engineers work and how industries evolve. In this changing landscape, engineers must not only master technology, but also adapt, lead, and stay resilient.
          </p>
          <p>
            For two days, this talkshow brings together Transformative Engineering and Beyond Limits to explore industrial transformation and the mindset needed to remain relevant and impactful.
          </p>

          <div className="font-bold text-white pt-2 text-base md:text-xl">
            <p>Day-1 : Friday, May 8th 2026 (Aula Timur)</p>
            <p>Day-2 : Saturday, May 9th 2026 (Aula Timur)</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-7xl font-bold mb-6 flex items-center gap-3">
            <span className="w-[35%] text-center">Day-1</span>
            <span className="">Topik Speech</span>
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-lg border border-gray-600 overflow-hidden mb-2 bg-gray-800">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-sm">{speaker.name}</p>
                <p className="text-xs text-gray-400">{speaker.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end gap-3">
            <TimerBox value="4" label="Days" />
            <Separator />
            <TimerBox value="20" label="Hours" />
            <Separator />
            <TimerBox value="69" label="Minutes" />
            <span className="text-base md:text-xl font-bold ml-2 pb-2">Friday, May 8th 2026</span>
          </div>

          <p className="text-base md:text-xl text-gray-400 leading-tight break-words mt-2">
            Sinopsis speech hmmmmm yeyeye fuwa fuwa
            uwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>

          <div className="mx-auto mt-4">
            <button className="bg-white text-black font-bold py-2 px-6 rounded-md hover:bg-gray-200 transition flex items-center gap-2">
              Register Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function TimerBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-2 border-gray-400 rounded-lg w-16 h-20 flex flex-col items-center justify-center bg-[#252538]">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs text-gray-300">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col gap-1 pb-4">
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
    </div>
  );
}