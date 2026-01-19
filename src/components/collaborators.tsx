import SponsorItem from "./sponsor-item";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Collaborators() {
  return (
    <section className="py-16">
      <BlurFade inView delay={0.2}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mt-8">
            In Collaboration With
          </h2>
          <div className="mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl items-center justify-center gap-x-5 md:gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
            <SponsorItem
              icon="Bentley"
              alt="Bentley"
              src="/sponsors/Logo Bentley.png"
              height={13}
              invert={true}
            />
            <SponsorItem
              icon="Himatika"
              alt="Himatika"
              height={13}
              src="/sponsors/Logo Himatika.png"
            />
            <SponsorItem
              icon="IAFMI"
              alt="IAFMI"
              height={13}
              src="/sponsors/Logo IAFMI.png"
            />
            <SponsorItem
              icon="Unilever"
              alt="Unilever"
              height={13}
              src="/sponsors/Logo Unilever.png"
            />
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
