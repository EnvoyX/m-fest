import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="w-full">
      <div>
        <div className="bg-[url('/mrunslice1.png')] bg-contain bg-no-repeat bg-center aspect-video" />
      </div>

      <div className="py-16 w-full">
        <h1 className="text-7xl font-bold text-center"> M-Run</h1>
        <Image
          src="/mrunimage1.png"
          alt="mrunimage1"
          height={1378}
          width={926}
          className="mx-auto pt-16 pb-5"
        />
        <div className="mx-80">
          <h1 className="text-3xl">
            Ever felt your heart pounding like a powerful engine, your breath
            flowing like a perfectly tuned air intake system, and your legs
            driving you forward like a high-performance transmission?
          </h1>
          <h1 className="font-semibold text-3xl pt-8">
            At M-RUN 2026, you’re not just running—you’re operating as the most
            advanced biological machine ever built: YOURSELF.
          </h1>
        </div>
      </div>
      <div className="mx-80 ">
        <h1 className="text-xl">The race will be on going on</h1>
        <h1 className="text-5xl">From now, that is roughly</h1>
      </div>

      <div className="py-16">
        <h1 className="mx-64 text-9xl font-bold">
          With the Grand Prize Totalling...
        </h1>
        <Image
          src="/mrunimage2.png"
          alt="mrunimage2"
          height={1000}
          width={4000}
          className="py-16"
        />
      </div>

      <div className="mx-64">
        <h1 className="text-7xl pb-5 font-semibold">Other Information</h1>
        <p className="text-3xl ">Distance 5km</p>
        <p className="text-3xl">Route : Institut Teknologi Bandung</p>
        <p className="text-3xl">Facility :</p>
        <ul className="space-y-3 text-xl list-disc list-inside ml-5">
          <li>M-Run 2026 Jersey</li>
          <li>Finisher Medal</li>
          <li>BIB</li>
          <li>Refreshments</li>
          <li>Doorprize Coupon</li>
        </ul>
      </div>

      <div className="py-16">
        <h1 className="text-6xl mx-24 py-3">Ready to operate at</h1>
        <h1 className="mx-24 text-6xl">full throttle?</h1>
        <Image
          src="/mrunimage3.png"
          alt="mrunimage3"
          width={1000}
          height={467}
          className="mx-auto pt-8"
        />
      </div>

      <div>
        <Image
          src="/mruntimeline.png"
          alt="mruntimeline"
          height={600}
          width={1200}
          className="mx-auto"
        />
        <p className="italic text-xl mx-64 pt-6">gotta go fast</p>
      </div>
    </div>
  );
}
