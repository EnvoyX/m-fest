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
    // const isEventsPage = pathname === "/events";
    // const isCompPage = pathname === "/competitions";
    return (
        <main
            // className={`min-h-screen ${isEventsPage || isCompPage ? "bg-[url('/timeslice.png')]" : "bg-[url('/fixed-background.png')]"} bg-cover bg-center bg-fixed`}
            className={`min-h-screen bg-[url('/timeslice.png')] bg-cover bg-center bg-fixed`}
        >
            <Navbar />
            {children}
            <HelpButton />
            <FooterSection />
        </main>
    );
}
