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
        href: "/competitions#bcc",
    },

    {
        title: "Innovative Poster and Paper Competition",
        card: "/competitions/card/IPPC.svg",
        href: "/competitions#ippc",
    },

    {
        title: "Pipeline Design Competition",
        card: "/competitions/card/PDC.svg",
        href: "/competitions#pdc",
    },

    {
        title: "STEM",
        card: "/competitions/card/STEM.svg",
        href: "/competitions#stem",
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
            className="group block w-48 rounded-xl overflow-hidden shadow-lg bg-white transition-transform transform-gpu md:grayscale hover:grayscale-0 hover:-translate-y-1"
        >
            <div className="relative h-120 w-full overflow-hidden">
                <Image
                    src={card}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    className="transition-transform duration-500 "
                    priority={false}
                />
            </div>
        </Link>
    );
}
