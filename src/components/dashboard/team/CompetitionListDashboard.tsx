import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { competitions } from "@/lib/competition";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type User } from "@/types/types";
import { getUser } from "@/action/user.action";
import { db } from "@/server/db";
import { Suspense } from "react";
import CompetitionListSkeleton from "../CompetitionListSkeleton";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconListDetails } from "@tabler/icons-react";
import QuotaTrack from "../QuotaTrack";
import StatusComp from "../StatusComp";
import ButtonComp from "../ButtonComp";
import { Badge } from "@/components/ui/badge";

export default function RegisteredCompetitionList() {
    return (
        <Suspense fallback={<CompetitionListSkeleton />}>
            <FetchUserAvailableCompetitions />
        </Suspense>
    );
}

async function FetchUserAvailableCompetitions() {
    const user = (await getUser()) as User;

    // Check current quota
    const stats = await db.compRegistration.groupBy({
        by: ["competitionName"],
        _count: { competitionName: true },
    });

    const counts = stats.reduce((acc, curr) => {
        acc[curr.competitionName] = curr._count.competitionName;
        return acc;
    }, {} as Record<string, number>);

    // console.log("Competition counts: ", counts);

    const registeredCompetitions = await db.compRegistration.findMany({
        where: {
            team: {
                members: {
                    some: {
                        userId: user.id,
                    },
                },
            },
        },
        include: {
            team: true,
        },
    });
    const userTeam = await db.team.findFirst({
        where: {
            members: {
                some: {
                    userId: user.id,
                },
            },
        },
    });

    const isTeamLeader = userTeam?.leaderUserId === user?.id;

    // console.log("Registered competitions: ", registeredCompetitions);
    const registeredCompetitionNames = registeredCompetitions.map(
        (competition) => competition.competitionName,
    );
    // console.log("Registered competition names: ", registeredCompetitionNames);
    const competitionsList = competitions.filter(
        (comp) => !registeredCompetitionNames.includes(comp.abbreviation),
    );


    if (!competitionsList.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <IconListDetails />
                        </EmptyMedia>
                        <EmptyTitle>No Available Competitions</EmptyTitle>
                        <EmptyDescription>
                            You have registered for all available competitions.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button className="cursor-pointer" asChild>
                            <Link href="/dashboard/competitions" prefetch>
                                View Registered Competitions
                            </Link>
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        );
    }

    // console.log("Registered competitions: ", competitionsList);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 items-stretch my-2">
            {competitionsList.map((comp) => {
                const currentQuota = counts[comp.abbreviation] || 0;
                const maxQuota = comp.maxQuota as number;
                const isQuotaFull = currentQuota >= maxQuota;
                return (
                    <Card
                        key={comp.abbreviation}
                        className="w-full max-w-sm bg-white/5 flex flex-col backdrop-glass-sm"
                    >
                        <CardHeader className="flex flex-col justify-center items-center mb-auto">
                            <CardTitle className="flex items-center gap-2">
                                {comp.abbreviation}
                            </CardTitle>
                            <CardDescription className="text-center text-sm line-clamp-1">
                                {comp.title}
                            </CardDescription>
                            <StatusComp comp={comp} fetchedCurrentQuota={currentQuota} maxQuota={maxQuota} />
                        </CardHeader>
                        <CardContent className="flex justify-center items-center grow my-auto">
                            <Image
                                src={comp.logo}
                                alt={comp.title}
                                width={200}
                                height={200}
                                loading="lazy"
                                className="object-cover"
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col justify-center mt-auto">
                            {comp.abbreviation === "BCC" ? <Badge className="bg-primary/30 text-primary border-primary/50 border  mb-5 text-sm">Unlimited Slots</Badge> : <QuotaTrack comp={comp.abbreviation} fetchedCurrentQuota={currentQuota} maxQuota={maxQuota} />}

                            <ButtonComp comp={comp} fetchedCurrentQuota={currentQuota} maxQuota={maxQuota} isTeamLeader={isTeamLeader} registeredCompetitions={registeredCompetitions} userTeam={userTeam} />
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
