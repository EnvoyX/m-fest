import { montserrat, onest, roboto } from "@/styles/font";
// @ts-ignore this import is exist
import "./globals.css";
// @ts-ignore this import is exist
import "lenis/dist/lenis.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { ReactLenis } from "lenis/react";
import QueryTanstackProvider from "@/components/providers/query-provider";
import type { Metadata } from "next";
import { env } from "@/env";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "Mechanical Festival 2026 (M-fest)",
  description:
    "Mechanical Festival 2026 (M-Fest) is a festival held by ITB's undergraduate mechanical engineering students. M-Fest contains events and competitions around engineering innovation by discussing current problems and how to find the right solutions.",

  metadataBase: new URL(baseUrl),

  keywords: [
    "Mechanical Festival 2026",
    "M-Fest 2026",
    "Mechanical Engineering Competition",
    "Engineering Festival Indonesia",
    "Student Engineering Events",
    "Mechanical Engineering ITB",
    "HMM ITB",
    "Himpunan Mahasiswa ITB",
    "M-Fest ITB",
    "Institut Teknologi Bandung",
    "Bandung",
    "Mechanical Engineering",
    "Himpunan Mahasiswa",
    "Mechanical Festival ITB",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Mechanical Festival 2026 (M-Fest)",
    description:
      "Official website of Mechanical Festival 2026 (M-Fest) is a festival held by ITB's undergraduate mechanical engineering students. M-Fest contains events and competitions around engineering innovation by discussing current problems and how to find the right solutions",
    url: baseUrl,
    siteName: "M-FEST 2026",
    images: [
      {
        url: "/banner-mfest-2026.png",
        width: 1200,
        height: 630,
        alt: "Mechanical Festival 2026 (M-Fest) Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mechanical Festival 2026 (M-Fest)",
    description:
      "Official website of Mechanical Festival 2026 (M-Fest) — Transforming Visions. Into Motions.",
    images: ["/banner-mfest-2026.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${roboto.variable} ${onest.className} antialiased`}
      >
        <ReactLenis root>
          <QueryTanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              enableSystem={false}
            >
              <NextTopLoader showSpinner={false} height={3} />

              {children}
              <Toaster />
            </ThemeProvider>
          </QueryTanstackProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
