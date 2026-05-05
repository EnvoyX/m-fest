import { BlurFade } from "@/components/ui/blur-fade";

export default function Sponsors() {
    return (
        <section className="pt-16">
            <BlurFade inView delay={0.2}>
                <div className="mx-auto px-6 max-w-7xl">
                    <h2 className="text-6xl font-bold text-center mt-8">
                        Our Sponsors
                    </h2>
                    <div className="flex flex-wrap items-center justify-center py-10">
                        <img
                            src="/sponsors/sponsors.png"
                            alt="logo sponsor"
                            className="w-full"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="text-6xl font-bold text-center mt-8">
                        Supported By
                    </h2>
                    <div className="flex flex-wrap items-center justify-center py-10">
                        <img
                            src="/sponsors/IAM.png"
                            alt="logo sponsor"
                            width="200"
                        />
                    </div>
                </div>
            </BlurFade>
        </section>
    );
}
