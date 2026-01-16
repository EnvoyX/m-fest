import Image from "next/image";
import { BlurFade } from "../ui/blur-fade";

export default function ContentSection() {
    return (
        <section className="mask-b-from-90% mask-b-to-100% relative min-h-[110dvh] w-full overflow-hidden bg-black flex flex-col justify-end pb-12 md:pb-32">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/home-page.svg"
                    alt="Comp Hero Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#252132] via-[#252132]/30 to-transparent" />
            </div>

            <div className="relative z-10 pb-15 md:pb-10 w-full px-6 md:pr-20 md:pl-0 flex flex-col items-center md:items-end">
                <div className="max-w-screen text-center px-6 mb-16 md:mb-0 md:text-right">
                    <BlurFade inView delay={0.3}>
                        <h2 className="text-5xl font-bold md:text-left leading-tight tracking-tight md:text-7xl drop-shadow-xl text-white [font-family:var(--font-next-montserrat)]">
                            Participate in our events!
                        </h2>
                    </BlurFade>

                    <BlurFade inView delay={0.3}>
                        <p className="mb-6 text-lg italic font-light text-gray-300 md:mb-8 md:text-2xl">
                            A cornucopia of choices to quench your interests
                        </p>
                    </BlurFade>

                    <BlurFade inView delay={0.3}>
                        <p className="mr-auto max-w-4xl text-xl text-center text-gray-200 md:text-left md:text-2xl">
                            Join us in our events to experience world of
                            mechanical engineering, and learn from the best. 
                        </p>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
}
