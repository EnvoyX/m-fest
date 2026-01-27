import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MCare() {
  return (
    <div className="w-full">
      <div>
        <div className="bg-[url('/mcareslice1.png')] bg-contain bg-no-repeat bg-center aspect-video" />
      </div>

      <div className="py-16 w-full">
        <h1 className="text-5xl lg:text-7xl font-semibold text-center pb-16">
          Klinik Mesin
        </h1>
        <Image
          src="/mcareimage1.png"
          alt="mcareimage1"
          height={1388}
          width={925}
          className="mx-auto"
        />
        <h1 className="text-lg lg:text-xl lg:mx-80">
          One of our event consisting free eye check-up and blood donation
        </h1>
      </div>

      <div className="mx-24 lg:mx-78">
        <h1 className="font-semibold text-4xl lg:text-5xl mb-12">
          {" "}
          Donor Requirements
        </h1>
        <ul className="list-disc list-inside space-y-5 text-2xl pl-5 mb-12">
          <li>18 years or older</li>
          <li>Ideal body weight, minimum body weight of 50kg</li>
          <li>
            Memiliki kondisi kesehatan yang baik / tidak sedang dalam pengobatan
          </li>
          <li>Tidak melakukan prosedur pembedahan</li>
          <li>Tidur dengan cukup sebelum prosedur minimal 5 jam</li>
          <li>Tidak mengkonsumsi alkohol/obat paracetamol/antibiotik</li>
          <li>
            Tidak mengkonsumsi makanan dengan kandungan tinggi lemak jenuh
          </li>
          <li>
            Tidak ada riwayat penyakit menular seperti heptatitis, TB, HIV/AIDS
          </li>
        </ul>
        <p className="text-lg lg:text-xl">
          No requirement for those attending only the eye check-up
        </p>
        <div className="z-10 relative w-1/2 h-1/2 bg-white">
          <Button asChild variant="secondary" size="lg" className="mx-auto">
            Register Here
          </Button>
        </div>
      </div>

      <div className="pt-16">
        <h1 className="text-6xl lg:text-7xl font-semibold text-center">
          Hari Main Bersama
        </h1>
        <h1 className="italic text-3xl lg:text-4xl text-center">
          Pertualangan Rimba, Warna dalam Cerita.
        </h1>
        <div className="mt-16 mb-6">
          <Image
            src="/mcareimg2.png"
            alt="image2"
            width={925}
            height={1388}
            className="mx-auto"
          />
        </div>
        <div className="mx-8 lg:mx-80">
          <h1 className="text-lg lg:text-xl font-thin">
            Melihat Lebih Baik, Memberi Lebih Banyak. Tema ini mencerminkan
            makna dari dua kegiatan Klinik Mesin yaitu Melihat Lebih Baik
            sebagai ajakan untuk menjaga kesehatan mata dan Memberi Lebih Banyak
            sebagai wujud nyata kepedulian terhadap sesama melalui donor darah.
          </h1>
        </div>
      </div>

      <div className="py-16">
        <Image
          src="/mcaretimeline.png"
          alt="M-Care Timeline"
          height={900}
          width={770}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
