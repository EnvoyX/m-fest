"use client";

import { Navbar } from "@/components/general/Navbar";
import FooterSection from "@/components/general/footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            // className={`min-h-screen ${isEventsPage || isCompPage ? "bg-[url('/timeslice.png')]" : "bg-[url('/fixed-background.png')]"} bg-cover bg-center bg-fixed`}
            className={`min-h-screen bg-[url('/timeslice.png')] bg-cover bg-center bg-fixed`}
        >
            <Navbar />
            {children}
            {/*<HelpButton />*/}
            <FooterSection />
        </main>
    );
}
