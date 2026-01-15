"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/general/Navbar";
import FooterSection from "@/components/general/footer";
import HelpButton from "../help-button";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isEventsPage = pathname === "/events";

    return (
        <main
            className={`min-h-screen ${isEventsPage ? "bg-[#252132]" : "bg-[url('/fixed-background.png')]"} bg-cover bg-center bg-fixed`}
        >
            <Navbar />
            {children}
            <HelpButton />
            <FooterSection />
        </main>
    );
}
