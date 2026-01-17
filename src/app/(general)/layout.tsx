import ClientLayout from "@/app/(general)/ClientLayout";

//   title: "Mechanical Festival 2026 (M-fest)",
//   description:
//     "Mechanical Festival 2026 (M-Fest) is a festival held by ITB's undergraduate mechanical engineering students. M-Fest contains events and competitions around engineering innovation by discussing current problems and how to find the right solutions.",

//   metadataBase: new URL("https://mfest-itb.com"),

//   keywords: [
//     "Mechanical Festival 2026",
//     "M-Fest 2026",
//     "Mechanical Engineering Competition",
//     "Engineering Festival Indonesia",
//     "Student Engineering Events",
//     "Mechanical Engineering ITB",
//     "HMM ITB",
//     "Himpunan Mahasiswa ITB",
//     "M-Fest ITB",
//     "Institut Teknologi Bandung",
//     "Bandung",
//     "Mechanical Engineering",
//     "Himpunan Mahasiswa",
//     "Mechanical Festival ITB",
//   ],

//   alternates: {
//     canonical: "/",
//   },

//   openGraph: {
//     title: "Mechanical Festival 2026 (M-Fest)",
//     description:
//       "Official website of Mechanical Festival 2026 (M-Fest) is a festival held by ITB's undergraduate mechanical engineering students. M-Fest contains events and competitions around engineering innovation by discussing current problems and how to find the right solutions",
//     url: "https://mfest-itb.com/",
//     siteName: "M-FEST 2026",
//     images: [
//       {
//         url: "/banner-mfest-2026.png",
//         width: 1200,
//         height: 630,
//         alt: "Mechanical Festival 2026 (M-Fest) Banner",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Mechanical Festival 2026 (M-Fest)",
//     description:
//       "Official website of Mechanical Festival 2026 (M-Fest) — Transforming Visions. Into Motions.",
//     images: ["/banner-mfest-2026.png"],
//   },

//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
