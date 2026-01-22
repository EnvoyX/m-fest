export default function MCare() {
  return (
    <div>
      <div>
        <div className="bg-[url('/mcareslice.png')] bg-contain bg-no-repeat bg-center aspect-video" />
        <div className="flex justify-end absolute">
          <h1 className="font-semibold text 6-xl">M-Care</h1>
          <p className="">
            {" "}
            Willing to lend a hand or two? Make sure to drop by
          </p>
        </div>
      </div>

      <div className="py-16 w-full">
        <h1 className="text-7xl font-semibold text-center pb-16">
          Klinik Mesin
        </h1>
        <div className="bg-[url('/mcareimage1.png')] w-1/2 h-1/2 aspect-video bg-no-repeat mx-auto" />
        <h1 className="text-center text-2xl">
          One of our event consisting free eye check-up and blood donation
        </h1>
      </div>
    </div>
  );
}
