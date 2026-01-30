import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MCare() {
  return (
    <div className="w-full overflow-x-hidden">

      <div className="pt-20 py-12 lg:py-16 w-full px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center pb-8 lg:pb-16">
          Klinik Mesin
        </h1>
        <Image
          src="/mcareimage1.png"
          alt="mcareimage1"
          height={1388}
          width={925}
          className="mx-auto w-full max-w-[925px] h-auto"
        />

        <div className="max-w-3xl mx-auto mt-8 text-center">
          <h1 className="text-lg lg:text-xl">
            One of our event consisting free eye check-up and blood donation
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-8 lg:mb-12">
          Donor Requirements
        </h1>
        <ul className="list-disc list-inside space-y-3 lg:space-y-5 text-lg md:text-xl lg:text-2xl pl-2 lg:pl-5 mb-8 lg:mb-12">
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
        <p className="text-lg lg:text-xl mb-8">
          No requirement for those attending only the eye check-up
        </p>
        
      <div className="flex justify-center">
        <Link href="/#">
          <Button 
          size="lg"
          className="rounded-xl text-base md:text-lg font-bold px-8 py-6 md:px-10 md:py-8 shadow-lg"
          >
            Register Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="pt-12 lg:pt-16 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-center">
          Hari Main Bersama
        </h1>
        <h1 className="italic text-xl md:text-3xl lg:text-4xl text-center mt-4">
          Pertualangan Rimba, Warna dalam Cerita.
        </h1>
        <div className="mt-8 lg:mt-16 mb-6">
          <Image
            src="/mcareimg2.png"
            alt="image2"
            width={925}
            height={1388}
            className="mx-auto w-full max-w-[925px] h-auto"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-base md:text-lg lg:text-xl font-thin leading-relaxed">
            Melihat Lebih Baik, Memberi Lebih Banyak. Tema ini mencerminkan
            makna dari dua kegiatan Klinik Mesin yaitu Melihat Lebih Baik
            sebagai ajakan untuk menjaga kesehatan mata dan Memberi Lebih Banyak
            sebagai wujud nyata kepedulian terhadap sesama melalui donor darah.
          </h1>
        </div>
      </div>

      <div className="py-12 lg:py-16 px-4">
        <Image
          src="/mcaretimeline.png"
          alt="M-Care Timeline"
          height={900}
          width={770}
          className="mx-auto w-full max-w-[770px] h-auto object-contain"
        />
      </div>
    </div>
  </div>
  );
}