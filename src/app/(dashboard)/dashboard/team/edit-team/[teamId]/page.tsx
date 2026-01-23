import { type Metadata } from "next";
import { getUser } from "@/action/user.action";
import { type Team, type User } from "@/types/types";
import TeamForm from "./edit-team-form";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import TeamFormSkeleton from "@/components/dashboard/edit-team/TeamFormSkeleton";

export const metadata: Metadata = {
  title: "Edit Team | Mechanical Festival 2026",
  description: "Edit Team to Mechanical Festival 2026",
};

export default function EditTeamPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  return (
    <section className="flex min-h-screen bg-transparent px-4 py-4 md:py-8 dark:bg-transparent">
      <div className="bg-transparent backdrop-glass-lg m-auto h-fit w-full max-w-5xl overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-transparent -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <h1 className="mb-1 mt-4 text-3xl font-semibold text-start">
              Edit Team
            </h1>
            <p className="text-sm text-destructive text-start font-bold mt-2">
              Team must be at least 3 members and maximum of 5 members. For
              STEM, BCC & IPPC, team must consist of 3 members only. PDC up to 5
              members.
            </p>
            <p className="text-sm text-destructive text-start font-bold mt-2">
              The first member is the team leader and the representative of the
              team which is the one who create the team and submit the
              registration.
            </p>
            <p className="text-sm text-destructive text-start font-bold mt-2">
              Please make sure your members have signed up or logged in on our
              website and complete their profile before adding them to your
              team. Make sure all member&apos;s institution are from the same
              institution.
            </p>
            <p className="text-sm text-destructive text-start font-bold mt-2">
              You just need input your member&apos;s email and their name and
              institution will automatically fill in. if their name and
              institution appears to be typo or not correct, or not filled in
              automatically, you can change or fill it manually
            </p>
            <p className="text-sm text-destructive text-start font-bold mt-2">
              Please match your member&apos;s institution with your team&apos;s
              institution (fullname).
            </p>
          </div>
          <Suspense fallback={<TeamFormSkeleton />}>
            <FetchTeamForm params={params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function FetchTeamForm({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const user: User = (await getUser()) as User;
  const { teamId } = await params;
  const team = await db.team.findUnique({
    where: { id: teamId, leaderUserId: user.id },
    include: { members: true },
  });

  if (!team) redirect("/dashboard/team");

  if (
    !team?.members.find(
      (member) => member.userId === user.id && member.role === "Leader",
    )
  )
    redirect("/dashboard/team");

  return <TeamForm team={team as Team} />;
}
