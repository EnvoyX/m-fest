'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

/*export default function ComingSoon() {
   return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-trasnparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border-2 shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)] py-4">
        <h1 className="text-center text-4xl lg:text-6xl font-bold">
          COMING SOON
        </h1>
      </div>
    </section>
  );
}*/

function Countdown() {
    const targetDate = new Date('2026-03-07T08:30:00');

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const d = Math.floor(difference / (1000 * 60 * 60 * 24));
                const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const m = Math.floor((difference / 1000 / 60) % 60);
                setTimeLeft({ days: d, hours: h, minutes: m });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-wrap justify-center items-end gap-2 md:gap-4">
            <div className="flex flex-col items-center">
                <div className="w-16 h-20 md:w-24 md:h-32 border border-gray-400 rounded-lg flex flex-col items-center justify-center bg-[#2b2b36]">
                    <span className="text-3xl md:text-5xl font-bold">{timeLeft.days}</span>
                    <div className="w-10 md:w-16 h-[1px] bg-gray-500 my-1 md:my-2"></div>
                    <span className="text-xs md:text-lg font-medium">Days</span>
                </div>
            </div>

            <div className="flex flex-col justify-center h-20 md:h-32 pb-2 md:pb-4 space-y-2 md:space-y-3">
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-white rounded-full"></div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-16 h-20 md:w-24 md:h-32 border border-gray-400 rounded-lg flex flex-col items-center justify-center bg-[#2b2b36]">
                    <span className="text-3xl md:text-5xl font-bold">{timeLeft.hours}</span>
                    <div className="w-10 md:w-16 h-[1px] bg-gray-500 my-1 md:my-2"></div>
                    <span className="text-xs md:text-lg font-medium">Hours</span>
                </div>
            </div>

            <div className="flex flex-col justify-center h-20 md:h-32 pb-2 md:pb-4 space-y-2 md:space-y-3">
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-white rounded-full"></div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-16 h-20 md:w-24 md:h-32 border border-gray-400 rounded-lg flex flex-col items-center justify-center bg-[#2b2b36]">
                    <span className="text-3xl md:text-5xl font-bold">{timeLeft.minutes}</span>
                    <div className="w-10 md:w-16 h-[1px] bg-gray-500 my-1 md:my-2"></div>
                    <span className="text-xs md:text-lg font-medium">Minutes</span>
                </div>
            </div>

            <span className="text-xl md:text-4xl text-white mb-2 ml-1 md:ml-2">
                from now
            </span>
        </div>
    );
}

export default function EngineTuneUpPage() {
    return (
        <div className="pt-10 min-h-screen text-white overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 md:px-12 md:py-16 flex flex-col items-center text-center md:text-left">

                <h1 className="text-4xl md:text-7xl font-bold my-6 md:my-10 text-center">
                    Engine Tune-Up
                </h1>

                <img
                    src="/events/page/gambar_etu.png"
                    alt="ETU"
                    className="mx-auto w-full max-w-4xl h-auto rounded-md object-cover"
                />

                <div className="max-w-4xl mx-auto space-y-6 my-10 text-lg md:text-xl lg:text-2xl text-justify md:text-left leading-relaxed">
                    <p>
                        Just as every heartbeat keeps the body moving, every drop of oil and every spark keeps a motorcycle alive.
                        At Engine Tune Up 2026, we focus on giving your machine the care it needs to stay reliable and efficient.
                        Through free oil and spark plug changes, we help restore balance to your engine, ensuring smoother rides and longer journeys.
                        It's a simple act of maintenance, but one that reflects the precision and dedication at the heart of mechanical engineering.
                    </p>
                    <p>
                        Only for automatic motorcycles with <span className="font-bold text-white">160cc or less engines or 150cc or less for manual motorcycles.</span>
                    </p>
                    <p>
                        The event will be held at <span className="font-bold text-white">March 7th 2026, 8:30 - 17:00</span>
                    </p>
                </div>

                <div className="flex flex-col items-center w-full mb-16">
                    <span className="text-3xl md:text-5xl mb-5 text-gray-300">Roughly...</span>
                    <Countdown />
                </div>

                <div className="w-full max-w-5xl mx-auto text-left">

                    <h2 id="sop" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 text-center tracking-tight">
                        Standard Operating Procedures
                    </h2>

                    <section className="mb-16">
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                            Peserta
                        </h3>
                        <ul className="list-disc pl-6 space-y-5 text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                            <li>
                                Peserta <span className="font-semibold text-white">DIWAJIBKAN</span> mengikuti peraturan dan arahan yang diberikan oleh panitia selama event berlangsung.
                            </li>
                            <li>
                                Peserta <span className="font-semibold text-white">DIANJURKAN</span> untuk datang tepat waktu sesuai jadwal acara.
                            </li>
                            <li>
                                Peserta <span className="font-semibold text-white">DIANJURKAN</span> menggunakan pakaian yang sopan.
                            </li>
                            <li>
                                Peserta <span className="font-semibold text-white">DIWAJIBKAN</span> menjaga kebersihan area event dan membuang sampah pada tempatnya.
                            </li>
                            <li>
                                Peserta <span className="font-semibold text-white">DIHARAPKAN</span> menjaga sikap sopan, menghormati sesama peserta dan panitia.
                            </li>
                            <li>
                                Peserta <span className="font-semibold text-white">DILARANG</span> membuat keributan atau mengganggu jalannya acara.
                            </li>
                            <li>
                                Jika peserta mengalami kendala teknis atau lainnya, <span className="font-semibold text-white">DIHARAPKAN</span> segera melapor kepada panitia.
                            </li>
                            <li>
                                SOP ini dapat berubah disesuaikan dengan kebutuhan event dan kebijakan yang berlaku.
                            </li>
                            <li>
                                Peserta Motor Matic maupun Motor Manual <span className="font-semibold text-white">DIHARAPKAN</span> datang pada pukul 07:30 - 12:00 untuk registrasi ulang pada tenda pendaftaran.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                            Automatic Motorcycles
                        </h3>
                        <ul className="list-disc pl-6 space-y-5 text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                            <li>Motor matic berusia &lt;25 Tahun dan masih dipakai untuk sehari-hari.</li>
                            <li>CC yang diterima adalah dalam range 100 - 160.</li>
                            <li>CVT tipe motor jepang ataupun piaggio (i-get) itu diterima namun harus siap dengan oli yang disediakan.</li>
                            <li>Motor tidak pernah kebanjiran dan bukan motor curian.</li>
                            <li>Motor harus sesuai dengan yang didaftarkan via RSVP.</li>
                            <li>Motor memiliki standar satu atau dua untuk parkir.</li>
                            <li>Kunci motor diserahkan kepada panitia setelah registrasi ulang.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                            Manual Motorcycles
                        </h3>
                        <ul className="list-disc pl-6 space-y-5 text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                            <li>Motor masih spesifikasi standar.</li>
                            <li>CC yang diterima adalah dalam range 70 - 200.</li>
                            <li>Hanya fokus pergantian oli.</li>
                            <li>Motor tidak pernah kebanjiran dan bukan motor curian.</li>
                            <li>Motor harus sesuai dengan yang didaftarkan via RSVP.</li>
                            <li>Kunci motor diserahkan kepada panitia setelah registrasi ulang.</li>
                        </ul>
                    </section>

                    <section className="mb-16">
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                            Old Motorcycles
                        </h3>
                        <ul className="list-disc pl-6 space-y-5 text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed">
                            <li>Motor kopling berusia &lt;25 Tahun dan masih dipakai untuk sehari-hari.</li>
                            <li>CC yang diterima adalah dalam range 100 - 200.</li>
                            <li>Kopling jenis bebek dapat diterima (fokus oli dan busi).</li>
                            <li>Motor tidak pernah kebanjiran dan bukan motor curian.</li>
                            <li>Motor harus sesuai dengan yang didaftarkan via RSVP.</li>
                            <li>Kunci motor diserahkan kepada panitia setelah registrasi ulang.</li>
                        </ul>
                    </section>
                </div>

                <div className="text-center w-full mt-8 md:mt-16">
                    <div className="text-3xl md:text-6xl lg:text-7xl mb-8 tracking-tight font-bold">
                        No need to worry, We'll fix them right.
                    </div>

                    <div className="p-6 rounded-xl inline-block mb-8">
                        <span className="text-3xl md:text-5xl">Registration</span><br />
                        <span className="text-lg md:text-2xl block mt-2"><span className="text-5xl font-bold">28</span> February <span className="text-5xl font-bold">- 7</span> March 2026 </span>
                        <span className="text-gray-400 text-sm">(depends on availability)</span><br />
                        <span className="font-black text-2xl md:text-3xl block mt-2">100% FREE</span>
                    </div>

                    <div>
                        <Button
                            asChild
                            size="lg"
                            className="rounded-xl text-lg md:text-xl font-bold px-10 py-6 md:px-12 md:py-8 shadow-lg"
                        >
                            <Link href='/dashboard/events/register/ETU'>
                                <span>Register Now</span>
                                <ChevronRight className="ml-2 w-6 h-6" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <section className="pt-10">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center lg:pb-10">
                        Our Collaborators
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 max-w-6xl mx-auto">
                        <Image
                            src="/events/page/logo_shell.png"
                            alt="logo shell"
                            height={469 / 2}
                            width={469 / 2}
                            className="h-auto w-auto object-contain"
                            unoptimized
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}
