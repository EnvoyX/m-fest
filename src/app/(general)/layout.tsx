import type { Metadata } from "next";
import ClientLayout from "@/app/(general)/ClientLayout"; // Make sure path is correct

export const metadata: Metadata = {
    title: "Mechanical Festival 2026",
    description: "Official website of M-Fest for events and competitions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        /* The Server Layout passes children down to the Client Layout */
        <ClientLayout>
            {children}
        </ClientLayout>
    );
}