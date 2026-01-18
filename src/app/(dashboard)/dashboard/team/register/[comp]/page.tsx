import RegisterForm from "./register-form";
import { redirect } from "next/navigation";
import {
    type Team,
    type CompRegistration,
    type TeamMember,
    CompetitionName,
} from "@/types/types";
import { competitionsName } from "@/constants/constants";
import { Suspense } from "react";
import { CompRegisterFormSkeleton } from "@/components/register/CompFormSkeleton";
import Link from "next/link";
import Image from "next/image";
import { competitions } from "@/lib/competition";
import { getRegisteredTeams } from "@/action/register.action";
import { getCompFee, getCurrentDate } from "@/lib/utils";
import { getUser } from "@/action/user.action";
import { db } from "@/server/db";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ comp: string }>;
}) {
    const comp = (await params).comp;
    return {
        title: `Register ${comp.toUpperCase()} | Mechanical Festival 2026`,
        description: `Register for ${comp.toUpperCase()} Competition`,
    };
}

export default function CompPage({
    params,
}: {
    params: Promise<{ comp: string }>;
}) {
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div className="bg-transparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-transparent backdrop-glass-lg -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <Suspense fallback={<CompRegisterFormSkeleton />}>
                        <FetchCompForm params={params} />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

async function FetchCompForm({
    params,
}: {
    params: Promise<{ comp: string }>;
}) {
    const user = await getUser();
    const userTeam = await db.team.findFirst({
        where: {
            members: {
                some: {
                    userId: user?.id,
                },
            },
        },
    });
    const registeredTeam = await db.compRegistration.findFirst({
        where: {
            team: {
                members: {
                    some: {
                        userId: user?.id,
                    },
                },
            },
        },
    });
    const isTeamLeader = userTeam?.leaderUserId === user?.id;
    let { comp } = await params;
    const currentDate = getCurrentDate();
    const thisComp = competitions.find(
        (c) => c.abbreviation === comp.toUpperCase(),
    );
    const compFee = getCompFee(comp);
    if (comp) {
        if (!competitionsName.includes(comp.toUpperCase())) {
            redirect("/dashboard/team");
        }
    }

    if (
        (thisComp?.startRegDate1 as Date) > currentDate ||
        (thisComp?.endRegDate3 as Date) < currentDate
    ) {
        redirect("/dashboard/team");
    }

    if (!userTeam) {
        redirect("/dashboard/team");
    }

    if (registeredTeam) {
        redirect("/dashboard/team");
    }

    if (!isTeamLeader) {
        redirect("/dashboard/team");
    }

    comp = comp.toLowerCase();

    const {
        allRegisteredTeamDatas,
        allTeamsDatas,
        allTeamMembersDatas,
        userTeams,
        userRegisteredCompetitions,
        userAsLeaderTeams,
        teamNames,
    } = await getRegisteredTeams();

    return (
        <>
            <div className="text-center">
                <Link
                    href={`/dashboard/team/register/${comp}`}
                    className="flex items-center gap-4 justify-center"
                >
                    <Image
                        src={`/competitions/logo/${comp}.png`}
                        alt="Mechanical Festival 2026"
                        width={150}
                        height={150}
                        loading="lazy"
                    />
                </Link>
                <h1 className="mb-1 mt-4 text-2xl font-semibold">
                    Register{" "}
                    {
                        competitions.find(
                            (c) => c.abbreviation === comp.toUpperCase(),
                        )?.title
                    }
                </h1>

                <p className="text-xl mb-2 text-red-500">
                    For STEM, BCC & IPPC, team must consist of 3 members only.
                    PDC up to 5 members
                </p>

                <h3 className="text-base">
                    {`Before you register, please read this competition's`}{" "}
                    <Link
                        className="underline italic font-bold"
                        href={
                            competitions.find(
                                (c) => c.abbreviation === comp.toUpperCase(),
                            )?.guideBook as string
                        }
                        target="_blank"
                    >
                        Guidebook
                    </Link>
                </h3>
                <h2 className="text-lg text-center mb-3">
                    Fee:{" "}
                    <span className="font-bold italic">
                        Rp. {""}
                        {compFee}
                    </span>
                </h2>
                <h3 className="text-base text-center mb-3">
                    Registration fees should be paid through the following bank
                    account:
                    <p className="flex flex-col items-center justify-center">
                        <span>Account Bank Name: SEABANK </span>
                        <span>Account Number: 901914836624 </span>
                        <span>Holder: Reva Elita Nurhaliza</span>
                    </p>
                </h3>
                <p className="text-sm mb-2">
                    Please fill in the form below to register for{" "}
                    {comp.toUpperCase()}
                </p>
            </div>
            <RegisterForm
                comp={comp.toUpperCase() as CompetitionName}
                userTeams={userTeams as Team[]}
                userRegisteredCompetitions={
                    userRegisteredCompetitions as CompRegistration[]
                }
                allTeamsDatas={allTeamsDatas as Team[]}
                allRegisteredTeamDatas={
                    allRegisteredTeamDatas as CompRegistration[]
                }
                allTeamMembersDatas={allTeamMembersDatas as TeamMember[]}
                userAsLeaderTeams={userAsLeaderTeams as Team[]}
                teamNames={teamNames as (string | null)[]}
            />
        </>
    );
}
