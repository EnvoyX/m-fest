import { BlurFade } from "@/components/ui/blur-fade";

export default function Sponsors() {
    return (
        <section className="py-16">
            <BlurFade inView delay={0.2}>
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-6xl font-bold text-center mt-8">
                        Our Sponsors
                    </h2>
                    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                        <img
                            src="/sponsors/Logo Company PT Pertamina EP Zona 7.png"
                            alt="Pertamina Logo"
                            width="275px"
                            height= "auto"
                        />
                    </div>
                </div>
            </BlurFade>
        </section>
    );
}
