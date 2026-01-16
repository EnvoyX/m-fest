import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function FooterSection() {
    return (
        <footer className="mask-t-from-80% lg:mask-t-from-90% lg:mask-t-to-100% min-h-screen relative py-16 md:py-32 ">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home-page.svg"
                    alt="Comp Hero Background"
                    fill
                    className="object-cover object-center rotate-180"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#252132] via-[#252132]/40 to-transparent" />
            </div>
            <div className="mx-auto max-w-5xl px-6 absolute bottom-64 left-0 right-0">
                <Link
                    href="/"
                    aria-label="go home"
                    className="flex items-center gap-4 justify-center"
                    prefetch
                >
                    <Image
                        src="/hmm.png"
                        alt="HMM ITB"
                        width={45}
                        height={45}
                        loading="lazy"
                    />
                    <Image
                        src="/logo.svg"
                        alt="Mechanical Festival 2025"
                        width={60}
                        height={60}
                        loading="lazy"
                    />
                </Link>

                <div className="mx-auto my-10 flex w-full md:w-fit items-center justify-center rounded-full border border-white bg-transparent py-3 px-8 text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                    <Link
                        href="https://instagram.com/mfestitb"
                        className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                            <FaInstagram className="text-xl" />
                        </div>
                        <span className="font-medium">mfestitb</span>
                    </Link>

                    <div className="mx-6 h-6 w-px" />

                    <Link
                        href="https://tiktok.com/@mfestitb"
                        className="flex items-center gap-3 hover:text-gray-200 transition-colors"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                            <FaTiktok className="text-xl" />
                        </div>
                        <span className="font-medium">mfestitb</span>
                    </Link>
                </div>

                <span className="text-accent-foreground text-center text-sm flex flex-col">
                    {" "}
                    © {new Date().getFullYear()} Mechanical Festival 2026, All
                    rights reserved.{" "}
                    <span>
                        {" "}
                        Jl. Ganesha 10 Coblong, Kota Bandung, Jawa Barat,
                        <br />
                        Indonesia 40132
                    </span>
                </span>
            </div>
        </footer>
    );
}
