import TeamList from "@/components/dashboard/documents/TeamList";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification | Mechanical Festival 2026",
  description: "Verification | Mechanical Festival 2026 | M-FEST 2026",
};

export default function DocumentsPage() {
  return (
    <section className="min-h-screen  w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="h-fit overflow-hidden rounded-[calc(var(--radius)+.125rem)] dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-transparent -m-px rounded-[calc(var(--radius)+.125rem)] border sm:p-8 sm:pb-6">
          <div className="text-center">
            <h1 className="mb-1 mt-4 text-4xl font-bold text-start">
              Verification
            </h1>
            <p className="text-lg text-start text-destructive">
              Please upload all your member&apos;s required files as{" "}
              <strong>leader</strong> of the team and other required data below
              to able to participate in competitions. Also make sure the{" "}
              <strong>leader</strong> is the one to upload all team
              member&apos;s required files. Do not forget to upload all the
              required files before submitting for each member!
            </p>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-foreground">Your Team</h1>
            <TeamList />
          </div>
        </div>
      </div>
    </section>
  );
}
