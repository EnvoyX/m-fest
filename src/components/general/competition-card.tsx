import Image from "next/image";
import Link from "next/link";

interface CompetitionCardProps {
    title: string;
    card: string;
    href: string;
}

export const Competitions = [
    {
        title: "Business Case Competition",
        card: "/competitions/card/BCC.svg",
        href: "/competitions/BCC",
    },

    {
        title: "Innovative Poster and Paper Competition",
        card: "/competitions/card/IPPC.svg",
        href: "/competitions/IPPC",
    },

    {
        title: "Pipeline Design Competition",
        card: "/competitions/card/PDC.svg",
        href: "/competitions/PDC",
    },

    {
        title: "STEM",
        card: "/competitions/card/STEM.svg",
        href: "/competitions/STEM",
    },
];

export default function CompetitionCard({
    title,
    card,
    href,
}: CompetitionCardProps) {
    return (
        <Link
            href={href}
            // Use 'transform-gpu' to force hardware acceleration
            className="group block w-48 rounded-xl overflow-hidden shadow-lg bg-white transition-transform transform-gpu md:grayscale hover:grayscale-0 hover:-translate-y-1"
        >
            <div className="relative h-120 w-full overflow-hidden">
                <Image
                    src={card}
                    alt={title}
                    fill // Fills the parent container
                    sizes="(max-width: 768px) 160px, 192px" // Tells browser exactly how big the image will be
                    className="transition-transform duration-500 "
                    priority={false} // Ensures lazy loading
                />
            </div>
        </Link>
    );
}
