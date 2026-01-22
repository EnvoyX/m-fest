import { type Metadata } from "next";
import DocumentsForm from "./document-form";
import { Suspense } from "react";
import DocumentFormSkeleton from "@/components/document/DocumentFormSkeleton";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { env } from "@/env";
import { getCurrentDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamId: string; userId: string }>;
}): Promise<Metadata> {
  const { teamId, userId } = await params;
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });
  const team = await db.team.findUnique({
    where: { id: teamId },
    select: { name: true },
  });
  return {
    title: `${user?.name} | ${team?.name} | Verification | Mechanical Festival 2026`,
    description: `Verification | Mechanical Festival 2026 | M-FEST 2026`,
  };
}

export default function MemberDocumentsPage({
  params,
}: {
  params: Promise<{ userId: string; teamId: string }>;
}) {
  return (
    <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="h-fit overflow-hidden rounded-[calc(var(--radius)+.125rem)]  shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-transparent -m-px rounded-[calc(var(--radius)+.125rem)] border sm:p-8 sm:pb-6">
          <div className="text-center">
            <h1 className="mb-1 mt-4 text-4xl font-semibold text-start">
              Verification
            </h1>
            <p className="text-lg text-start">
              Please upload all required files to able to participate in
              competition.
            </p>

            <p className="text-lg text-start text-destructive">
              Do not forget to submit after you uploaded all the required files!
            </p>
          </div>

          <div>
            <Suspense fallback={<DocumentFormSkeleton />}>
              <RenderDocumentsForm params={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

async function RenderDocumentsForm({
  params,
}: {
  params: Promise<{ userId: string; teamId: string }>;
}) {
  const currentDate = getCurrentDate();
  const { userId, teamId } = await params;

  if (!userId || !teamId) {
    redirect("/dashboard/team");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    redirect("/dashboard/team");
  }

  const team = await db.team.findUnique({
    where: { id: teamId },
    select: { verificationDeadlineAt: true },
  });
  if (!team) {
    redirect("/dashboard/team");
  }

  const verificationDeadline = new Date(
    new Date(team.verificationDeadlineAt as Date).getTime() -
      7 * 60 * 60 * 1000,
  );

  const isDeadlinePassed = verificationDeadline
    ? new Date(verificationDeadline as Date).getTime() < currentDate.getTime()
    : false;
  if (isDeadlinePassed) {
    redirect(`${env.NEXT_PUBLIC_BASE_URL}/dashboard/documents/${teamId}`);
  }
  return <DocumentsForm userId={userId} teamId={teamId} />;
}
