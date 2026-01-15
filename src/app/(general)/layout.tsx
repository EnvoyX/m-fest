import type { Metadata } from "next";
import ClientLayout from "@/app/(general)/ClientLayout";

export const metadata: Metadata = {
    title: "Mechanical Festival 2026",
    description: "Official website of M-Fest for events and competitions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ClientLayout>{children}</ClientLayout>;
}
