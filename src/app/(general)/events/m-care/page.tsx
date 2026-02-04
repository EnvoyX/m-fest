import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentDate } from "@/lib/utils";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import { SegmentBoundaryTriggerNode } from "next/dist/next-devtools/userspace/app/segment-explorer-node";

export default function MCare() {
  const currentDate = getCurrentDate();
  const startRegDate = new Date("2026-02-06T00:00:00");
  const endRegDate = new Date("2026-02-13T23:59:59");

  return (
    <div className="w-full overflow-x-hidden">
      <div className="pt-20 py-12 lg:py-16 w-full px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center pb-8 lg:pb-16 lg:pt-10">
          Klinik Mesin
        </h1>
        <Image
          src="/events/card/mcare.JPG"
          alt="mcareimage1"
          height={1388}
          width={925}
          className="mx-auto w-full max-w-[925px] h-auto rounded-xl"
        />

        <div className="max-w-3xl mx-auto mt-8 text-center">
          <h1 className="text-lg lg:text-xl">
            Salah satu event kami yang berisi cek kesehatan mata dan donor darah
          </h1>
        </div>
      </div>

      <div
        className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
        id="syarat-ketentuan"
      >
        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mb-8 lg:mb-12">
          Syarat Donor
        </h1>
        <ul className="list-disc list-inside space-y-3 lg:space-y-5 text-lg md:text-xl lg:text-2xl pl-2 lg:pl-5 mb-8 lg:mb-12">
          <li>18 tahun keatas</li>
          <li>Berat badan ideal dengan minimum 50 kg</li>
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
          Tidak ada ketentuan bagi yang hanya mengikuti cek kesehatan mata
        </p>

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
              <span className="cursor-not-allowed opacity-50">
                Registration Closed
              </span>
            ) : (
              <Link href="/#">
                <span className="flex">
                  Register Now <ChevronRight className="size-5 my-auto" />{" "}
                </span>
              </Link>
            )}
          </Button>
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
              src="/events/page/image.png"
              alt="image2"
              width={925}
              height={1388}
              className="mx-auto w-full max-w-[925px] h-auto rounded-xl"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-base md:text-lg lg:text-xl font-thin leading-relaxed">
              Melihat Lebih Baik, Memberi Lebih Banyak. Tema ini mencerminkan
              makna dari dua kegiatan Klinik Mesin yaitu Melihat Lebih Baik
              sebagai ajakan untuk menjaga kesehatan mata dan Memberi Lebih
              Banyak sebagai wujud nyata kepedulian terhadap sesama melalui
              donor darah.
            </h1>
          </div>
        </div>

      <div className="py-12 lg:py-16 px-4">
        <Image
          src="/timelinemcare.png"
          alt="M-Care Timeline"
          height={900}
          width={770}
          className="mx-auto w-full max-w-[770px] h-auto object-contain"
        />
      </div>

      <section className="pb-5">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center pb-8 lg:pb-16">
          Our Collaborators
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 max-w-6xl mx-auto">
          <Image
            src="/events/page/logo_rshs.png"
            alt="logo rshs"
            height={469 / 2}
            width={1602 / 2}
            className="h-auto w-auto max-h-24 object-contain"
            unoptimized
          />
          <Image
            src="/events/page/logo_sosmas.png"
            alt="logo sosmas"
            height={469 / 2}
            width={489 / 2}
            className="h-auto w-auto max-h-24 object-contain"
            unoptimized
          />
          <Image
            src="/events/page/logo_bec.png"
            alt="logo bec"
            height={469 / 2}
            width={1826 / 2}
            className="h-auto w-auto max-h-24 object-contain"
            unoptimized
          />
        </div>
      </section>
    </div>
  </div>
  );
}
