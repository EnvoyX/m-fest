import CountdownClient from "@/components/dashboard/competitions/CountdownClient";
import SubmitForm from "@/components/dashboard/competitions/SubmitForm";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import { Separator } from "@/components/ui/separator";
import { competitions } from "@/lib/competition";
import { auth } from "@/server/auth/auth";
import { db } from "@/server/db";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SubmissionSkeleton } from "./CompFormSkeleton";
import { cn, getCurrentDate } from "@/lib/utils";
import { format, isBefore } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExamAttempt, getExamStatus } from "@/lib/exam-states";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ compId: string }>;
}): Promise<Metadata> {
    const compId = (await params).compId;
    const competition = await db.compRegistration.findUnique({
        where: {
            id: compId,
        },
    });
    return {
        title: `Competition ${competition?.competitionName} Details | Mechanical Festival 2026`,
        description: `Dashboard Competition ${competition?.competitionName} details`,
    };
}

export default function CompPage({
    params,
}: {
    params: Promise<{ compId: string }>;
}) {
    return (
        <>
            <Suspense fallback={<SubmissionSkeleton />}>
                <FetchCompForm params={params} />
            </Suspense>
        </>
    );
}

async function FetchCompForm({
    params,
}: {
    params: Promise<{ compId: string }>;
}) {
    const { compId } = await params;
    const currentDate = getCurrentDate();
    const competition = await db.compRegistration.findUnique({
        where: {
            id: compId,
        },
    });
    const thisComp = competitions.find(
        (comp) => comp.abbreviation === competition?.competitionName,
    );
    const comp = competition?.competitionName;
    const submissionDeadline = competitions.find(
        (competition) => competition.abbreviation === comp?.toUpperCase(),
    )?.submissionDeadline;
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const team = await db.team.findFirst({
        where: {
            members: {
                some: {
                    user: {
                        id: session?.user.id,
                    },
                },
            },
        },
    });

    if (!comp || !competition || !compId) {
        redirect("/dashboard/competitions");
    }

    if (!team) {
        redirect("/dashboard/competitions");
    }

    if (team?.teamStatus !== "ACCEPTED") {
        redirect("/dashboard/competitions");
    }

    if (comp === "STEM" && team.competition === "STEM") {
        const examAttempted = await getExamAttempt(session?.user?.id)
        const isExamOpen = await getExamStatus()
        return (
            // Tryout Exam Here
            <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="p-6 flex flex-col sm:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            EXAM DETAILS FOR {comp.toUpperCase()}
                        </h1>
                        <div className="flex gap-6 text-muted-foreground mb-2 flex-col sm:flex-row">
                            <span>
                                {comp.toUpperCase() === "BCC"
                                    ? "Business Case Competition"
                                    : comp.toUpperCase() === "IPPC"
                                        ? "Innovative Poster and Paper Competition"
                                        : comp.toUpperCase() === "PDC"
                                            ? "Pipeline Design Competition"
                                            : comp.toUpperCase() === "STEM"
                                                ? "Science, Technology, Engineering, and Mathematics (STEM) Competition"
                                                : null}{" "}
                                2026
                            </span>
                        </div>
                        <Separator orientation="horizontal" />
                        <div className="mt-6 mb-6 text-white w-full">
                            <p>
                                Hello participant of {comp.toUpperCase()} !!
                                <br />
                                Here is the submission details for {comp.toUpperCase()} 2026.
                                Also there are attached files you need to see.
                            </p>
                            <p className="mt-3">
                                Good luck!
                                <br />
                                If there is any question you can contact our contact person in
                                the home page.
                                <br />
                                You can submit your exam by press &quot;Submit&quot; after you
                                finish your work.
                            </p>
                            <p className="mt-3">Guidelines and Information:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                <Button asChild>
                                    <LinkPreview
                                        url={
                                            competitions.find(
                                                (competition) =>
                                                    competition.abbreviation === comp.toUpperCase(),
                                            )?.guideBook as string
                                        }
                                        className="font-bold bg-transparent border-3 hover:bg-white/20"
                                    >
                                        Guidebook
                                    </LinkPreview>
                                </Button>
                            </div>
                            <p className="mt-3">
                                Stay tuned for more information. We will notify you if the exam
                                is available.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                                {examAttempted ? (
                                    <Button className={cn({ "opacity-50 cursor-not-allowed": examAttempted })} variant={"outline"} disabled={examAttempted}>
                                        Exam Attempted
                                    </Button>
                                ) : isExamOpen ? (<Button className={cn({ "opacity-50 cursor-not-allowed": !isExamOpen })} variant={"outline"} disabled={!isExamOpen} asChild>
                                    <Link href={"entry-exam"}>Start Exam</Link>
                                </Button>) : (
                                    <Button className={cn({ "opacity-50 cursor-not-allowed": !isExamOpen })} variant={"outline"} disabled={!isExamOpen}>
                                        Exam closed
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (team?.leaderUserId !== session?.user.id) {
        redirect("/dashboard/competitions");
    }

    if (comp === "BCC" && team.competition === "BCC") {
        return (
            <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <Tabs defaultValue="extended-abstract" className="p-6! flex! flex-col! sm:flex-row!">
                    <div className="border-r-0 sm:border-r p-4">
                        <h1 className="text-3xl font-bold text-foreground">
                            SUBMISSION DETAILS FOR {comp.toUpperCase()}
                        </h1>
                        <div className="flex gap-6 text-muted-foreground mb-2 flex-col sm:flex-row">
                            <span>
                                {comp.toUpperCase() === "BCC"
                                    ? "Business Case Competition"
                                    : comp.toUpperCase() === "IPPC"
                                        ? "Innovative Poster and Paper Competition"
                                        : comp.toUpperCase() === "PDC"
                                            ? "Pipeline Design Competition"
                                            : comp.toUpperCase() === "STEM"
                                                ? "Science, Technology, Engineering, and Mathematics (STEM) Competition"
                                                : null}{" "}
                                2026
                            </span>
                        </div>
                        <TabsList variant={"line"}>
                            <TabsTrigger value="extended-abstract">Preliminary</TabsTrigger>
                            <TabsTrigger value="full-paper">Pitch Deck</TabsTrigger>
                        </TabsList>
                        <Separator orientation="horizontal" />

                        <TabsContent value="extended-abstract">
                            <div className="mt-6 mb-6 text-white w-full">
                                <p>
                                    Hello participant of {comp.toUpperCase()} !!
                                    <br />
                                    Here is the submission details for {comp.toUpperCase()} 2026. Also
                                    there are attached files you need to see.
                                </p>
                                <p className="mt-3">
                                    Good luck!
                                    <br />
                                    If there is any question you can contact our contact person in the
                                    home page.
                                    <br />
                                    You can submit your submission for Extended Abstract by press &quot;Submit&quot; button
                                    on the right
                                </p>
                                <p className="mt-3">Guidelines and Information:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Button asChild>
                                        <LinkPreview
                                            url={
                                                competitions.find(
                                                    (competition) =>
                                                        competition.abbreviation === comp.toUpperCase(),
                                                )?.guideBook as string
                                            }
                                            className="font-bold bg-transparent border-3 hover:bg-white/20"
                                        >
                                            Guidebook
                                        </LinkPreview>
                                    </Button>
                                    {(competitions.find(
                                        (competition) =>
                                            competition.abbreviation === comp.toUpperCase(),
                                    )?.caseLink as string) && (
                                            <Button asChild>
                                                <LinkPreview
                                                    url={
                                                        competitions.find(
                                                            (competition) =>
                                                                competition.abbreviation === comp.toUpperCase(),
                                                        )?.caseLink as string
                                                    }
                                                    className="font-bold bg-transparent border-3 hover:bg-white/20"
                                                >
                                                    Case
                                                </LinkPreview>
                                            </Button>
                                        )}
                                </div>
                                <p className="mt-3 text-destructive">
                                    <span className="font-medium">
                                        {thisComp?.submissionContext}{" "}
                                    </span>{" "}
                                    <span className="font-bold">
                                        {format(
                                            thisComp?.submissionDeadline as Date,
                                            "EEEE, d MMMM yyyy, HH:mm",
                                        )}
                                    </span>
                                </p>
                                <div className="mt-6 flex justify-center sm:justify-start">
                                    <CountdownClient
                                        date={
                                            competitions.find(
                                                (competition) =>
                                                    competition.abbreviation === comp.toUpperCase(),
                                            )?.submissionDeadline as Date
                                        }
                                        description="Submission Deadline"
                                        type="submissionDeadline"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* ---- FULL PAPER TAB ---- */}
                        <TabsContent value="full-paper">
                            <div className="mt-6 mb-6 text-white w-full">
                                <p>
                                    Hello participant of {comp.toUpperCase()} !!
                                    <br />
                                    Here is the submission details for {comp.toUpperCase()} 2026. Also
                                    there are attached files you need to see.
                                </p>
                                <p className="mt-3">
                                    Good luck!
                                    <br />
                                    If there is any question you can contact our contact person in the
                                    home page.
                                    <br />
                                    You can submit your submission for Full Paper by press &quot;Submit&quot; button
                                    on the right
                                </p>
                                <p className="mt-3">Guidelines and Information:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Button asChild>
                                        <LinkPreview
                                            url={
                                                competitions.find(
                                                    (competition) =>
                                                        competition.abbreviation === comp.toUpperCase(),
                                                )?.guideBook as string
                                            }
                                            className="font-bold bg-transparent border-3 hover:bg-white/20"
                                        >
                                            Guidebook
                                        </LinkPreview>
                                    </Button>
                                    {(competitions.find(
                                        (competition) =>
                                            competition.abbreviation === comp.toUpperCase(),
                                    )?.caseLink as string) && (
                                            <Button asChild>
                                                <LinkPreview
                                                    url={
                                                        competitions.find(
                                                            (competition) =>
                                                                competition.abbreviation === comp.toUpperCase(),
                                                        )?.caseLink as string
                                                    }
                                                    className="font-bold bg-transparent border-3 hover:bg-white/20"
                                                >
                                                    Case
                                                </LinkPreview>
                                            </Button>
                                        )}
                                </div>
                                <p className="mt-3 text-destructive">
                                    <span className="font-medium">
                                        {thisComp?.submissionContext2}{" "}
                                    </span>{" "}
                                    <span className="font-bold">
                                        {format(
                                            thisComp?.submissionDeadline2 as Date,
                                            "EEEE, d MMMM yyyy, HH:mm",
                                        )}
                                    </span>
                                </p>
                                <div className="mt-6 flex justify-center sm:justify-start">
                                    <CountdownClient
                                        date={
                                            competitions.find(
                                                (competition) =>
                                                    competition.abbreviation === comp.toUpperCase(),
                                            )?.submissionDeadline2 as Date
                                        }
                                        description="Submission Deadline"
                                        type="submissionDeadline"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </div>

                    <TabsContent value="extended-abstract">
                        {submissionDeadline && isBefore(currentDate, submissionDeadline) ? (
                            <div className="p-6 bg-transparent">
                                <h1 className="text-center font-bold text-2xl">Upload Extended Abstract</h1>
                                <SubmitForm comp={comp} leaderUserId={team.leaderUserId} type="preliminary" />
                            </div>
                        ) : null}
                    </TabsContent>
                    <TabsContent value="full-paper">
                        {thisComp?.submissionDeadline2 && isBefore(currentDate, thisComp.submissionDeadline2) ? (
                            <div className="p-6 bg-transparent">
                                <h1 className="text-center font-bold text-2xl">
                                    Upload {comp === "BCC" ? "Pitch Deck" : "Full Paper"}
                                </h1>
                                <SubmitForm comp={comp} leaderUserId={team.leaderUserId} type="pitch-deck" />
                            </div>
                        ) : null}
                    </TabsContent>
                </Tabs>
            </section>
        );
    }

    if (comp === "IPPC" && team.competition === "IPPC") {
        return (
            <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <Tabs defaultValue="extended-abstract" className="p-6! flex! flex-col! sm:flex-row!">
                    <div className="border-r-0 sm:border-r p-4">
                        <h1 className="text-3xl font-bold text-foreground">
                            SUBMISSION DETAILS FOR {comp.toUpperCase()}
                        </h1>
                        <div className="flex gap-6 text-muted-foreground mb-2 flex-col sm:flex-row">
                            <span>
                                {comp.toUpperCase() === "BCC"
                                    ? "Business Case Competition"
                                    : comp.toUpperCase() === "IPPC"
                                        ? "Innovative Poster and Paper Competition"
                                        : comp.toUpperCase() === "PDC"
                                            ? "Pipeline Design Competition"
                                            : comp.toUpperCase() === "STEM"
                                                ? "Science, Technology, Engineering, and Mathematics (STEM) Competition"
                                                : null}{" "}
                                2026
                            </span>
                        </div>
                        <TabsList variant={"line"}>
                            <TabsTrigger value="extended-abstract">Extended Abstract</TabsTrigger>
                            <TabsTrigger value="full-paper">Full Paper</TabsTrigger>
                        </TabsList>
                        <Separator orientation="horizontal" />

                        <TabsContent value="extended-abstract">
                            <div className="mt-6 mb-6 text-white w-full">
                                <p>
                                    Hello participant of {comp.toUpperCase()} !!
                                    <br />
                                    Here is the submission details for {comp.toUpperCase()} 2026. Also
                                    there are attached files you need to see.
                                </p>
                                <p className="mt-3">
                                    Good luck!
                                    <br />
                                    If there is any question you can contact our contact person in the
                                    home page.
                                    <br />
                                    You can submit your submission for Extended Abstract by press &quot;Submit&quot; button
                                    on the right
                                </p>
                                <p className="mt-3">Guidelines and Information:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Button asChild>
                                        <LinkPreview
                                            url={
                                                competitions.find(
                                                    (competition) =>
                                                        competition.abbreviation === comp.toUpperCase(),
                                                )?.guideBook as string
                                            }
                                            className="font-bold bg-transparent border-3 hover:bg-white/20"
                                        >
                                            Guidebook
                                        </LinkPreview>
                                    </Button>
                                    {(competitions.find(
                                        (competition) =>
                                            competition.abbreviation === comp.toUpperCase(),
                                    )?.caseLink as string) && (
                                            <Button asChild>
                                                <LinkPreview
                                                    url={
                                                        competitions.find(
                                                            (competition) =>
                                                                competition.abbreviation === comp.toUpperCase(),
                                                        )?.caseLink as string
                                                    }
                                                    className="font-bold bg-transparent border-3 hover:bg-white/20"
                                                >
                                                    Case
                                                </LinkPreview>
                                            </Button>
                                        )}
                                </div>
                                <p className="mt-3 text-destructive">
                                    <span className="font-medium">
                                        {thisComp?.submissionContext}{" "}
                                    </span>{" "}
                                    <span className="font-bold">
                                        {format(
                                            thisComp?.submissionDeadline as Date,
                                            "EEEE, d MMMM yyyy, HH:mm",
                                        )}
                                    </span>
                                </p>
                                <div className="mt-6 flex justify-center sm:justify-start">
                                    <CountdownClient
                                        date={
                                            competitions.find(
                                                (competition) =>
                                                    competition.abbreviation === comp.toUpperCase(),
                                            )?.submissionDeadline as Date
                                        }
                                        description="Submission Deadline"
                                        type="submissionDeadline"
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* ---- FULL PAPER TAB ---- */}
                        <TabsContent value="full-paper">
                            <div className="mt-6 mb-6 text-white w-full">
                                <p>
                                    Hello participant of {comp.toUpperCase()} !!
                                    <br />
                                    Here is the submission details for {comp.toUpperCase()} 2026. Also
                                    there are attached files you need to see.
                                </p>
                                <p className="mt-3">
                                    Good luck!
                                    <br />
                                    If there is any question you can contact our contact person in the
                                    home page.
                                    <br />
                                    You can submit your submission for Full Paper by press &quot;Submit&quot; button
                                    on the right
                                </p>
                                <p className="mt-3">Guidelines and Information:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                    <Button asChild>
                                        <LinkPreview
                                            url={
                                                competitions.find(
                                                    (competition) =>
                                                        competition.abbreviation === comp.toUpperCase(),
                                                )?.guideBook as string
                                            }
                                            className="font-bold bg-transparent border-3 hover:bg-white/20"
                                        >
                                            Guidebook
                                        </LinkPreview>
                                    </Button>
                                    {(competitions.find(
                                        (competition) =>
                                            competition.abbreviation === comp.toUpperCase(),
                                    )?.caseLink as string) && (
                                            <Button asChild>
                                                <LinkPreview
                                                    url={
                                                        competitions.find(
                                                            (competition) =>
                                                                competition.abbreviation === comp.toUpperCase(),
                                                        )?.caseLink as string
                                                    }
                                                    className="font-bold bg-transparent border-3 hover:bg-white/20"
                                                >
                                                    Case
                                                </LinkPreview>
                                            </Button>
                                        )}
                                </div>
                                <p className="mt-3 text-destructive">
                                    <span className="font-medium">
                                        {thisComp?.submissionContext2}{" "}
                                    </span>{" "}
                                    <span className="font-bold">
                                        {format(
                                            thisComp?.submissionDeadline2 as Date,
                                            "EEEE, d MMMM yyyy, HH:mm",
                                        )}
                                    </span>
                                </p>
                                <div className="mt-6 flex justify-center sm:justify-start">
                                    <CountdownClient
                                        date={
                                            competitions.find(
                                                (competition) =>
                                                    competition.abbreviation === comp.toUpperCase(),
                                            )?.submissionDeadline2 as Date
                                        }
                                        description="Submission Deadline"
                                        type="submissionDeadline"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </div>

                    <TabsContent value="extended-abstract">
                        {submissionDeadline && isBefore(currentDate, submissionDeadline) ? (
                            <div className="p-6 bg-transparent">
                                <h1 className="text-center font-bold text-2xl">Upload Extended Abstract</h1>
                                <SubmitForm comp={comp} leaderUserId={team.leaderUserId} type="preliminary" />
                            </div>
                        ) : null}
                    </TabsContent>
                    <TabsContent value="full-paper">
                        {thisComp?.submissionDeadline2 && isBefore(currentDate, thisComp.submissionDeadline2) ? (
                            <div className="p-6 bg-transparent">
                                <h1 className="text-center font-bold text-2xl">Upload Full Paper</h1>
                                <SubmitForm comp={comp} leaderUserId={team.leaderUserId} type="full-paper" />
                            </div>
                        ) : null}
                    </TabsContent>
                </Tabs>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
            <div className="p-6 flex flex-col sm:flex-row">
                <div className="border-r-0 sm:border-r p-4">
                    <h1 className="text-3xl font-bold text-foreground">
                        SUBMISSION DETAILS FOR {comp.toUpperCase()}
                    </h1>
                    <div className="flex gap-6 text-muted-foreground mb-2 flex-col sm:flex-row">
                        <span>
                            {comp.toUpperCase() === "BCC"
                                ? "Business Case Competition"
                                : comp.toUpperCase() === "IPPC"
                                    ? "Innovative Poster and Paper Competition"
                                    : comp.toUpperCase() === "PDC"
                                        ? "Pipeline Design Competition"
                                        : comp.toUpperCase() === "STEM"
                                            ? "Science, Technology, Engineering, and Mathematics (STEM) Competition"
                                            : null}{" "}
                            2026
                        </span>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="mt-6 mb-6 text-white w-full">
                        <p>
                            Hello participant of {comp.toUpperCase()} !!
                            <br />
                            Here is the submission details for {comp.toUpperCase()} 2026. Also
                            there are attached files you need to see.
                        </p>

                        <p className="mt-3">
                            Good luck!
                            <br />
                            If there is any question you can contact our contact person in the
                            home page.
                            <br />
                            You can submit your submission by press &quot;Submit&quot; button
                            on the right
                        </p>
                        <p className="mt-3">Guidelines and Information:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            <Button asChild>
                                <LinkPreview
                                    url={
                                        competitions.find(
                                            (competition) =>
                                                competition.abbreviation === comp.toUpperCase(),
                                        )?.guideBook as string
                                    }
                                    className="font-bold bg-transparent border-3 hover:bg-white/20"
                                >
                                    Guidebook
                                </LinkPreview>
                            </Button>
                            {(competitions.find(
                                (competition) =>
                                    competition.abbreviation === comp.toUpperCase(),
                            )?.caseLink as string) && (
                                    <Button asChild>
                                        <LinkPreview
                                            url={
                                                competitions.find(
                                                    (competition) =>
                                                        competition.abbreviation === comp.toUpperCase(),
                                                )?.caseLink as string
                                            }
                                            className="font-bold bg-transparent border-3 hover:bg-white/20"
                                        >
                                            Case
                                        </LinkPreview>
                                    </Button>
                                )}
                        </div>
                        <p className="mt-3 text-destructive">
                            <span className="font-medium">
                                {thisComp?.submissionContext}{" "}
                            </span>{" "}
                            <span className="font-bold">
                                {format(
                                    thisComp?.submissionDeadline as Date,
                                    "EEEE, d MMMM yyyy, HH:mm",
                                )}
                            </span>
                        </p>
                        <div className="mt-6 flex justify-center sm:justify-start">
                            <CountdownClient
                                date={
                                    competitions.find(
                                        (competition) =>
                                            competition.abbreviation === comp.toUpperCase(),
                                    )?.submissionDeadline as Date
                                }
                                description="Submission Deadline"
                                type="submissionDeadline"
                            />
                        </div>
                    </div>
                </div>
                {submissionDeadline && isBefore(currentDate, submissionDeadline) && (
                    <div className="p-6 bg-transparent ">
                        <SubmitForm comp={comp} leaderUserId={team.leaderUserId} />
                    </div>
                )}
            </div>
        </section>
    );
}