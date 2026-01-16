import type { Metadata } from "next";
import CompetitionsHero from "./CompetitionHero";
import CompetitionsList from "./CompetitionList";

export const metadata: Metadata = {
    title: "Competitions | Mechanical Festival 2026",
    description: "Competitions of Mechanical Festival 2026",
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
