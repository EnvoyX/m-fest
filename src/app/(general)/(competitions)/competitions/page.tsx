import type { Metadata } from "next";
import CompetitionsHero from "./CompetitionHero";
import CompetitionsList from "./CompetitionList";

export const metadata: Metadata = {
  title: "Competitions | Mechanical Festival 2026",
  description:
    "Competitions of Mechanical Festival 2026 | Push the boundaries of your skills. M-Fest invites you to tackle real-world challenges with creativity and technical expertise. Design, build, and innovate.",
};

function CompetitionsPage() {
  return (
    <main className="min-h-screen">
      <CompetitionsHero />
      <CompetitionsList />
    </main>
  );
}

export default CompetitionsPage;
