import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
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
import { cn, getCurrentDate, wibToUTC } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { isBefore, isWithinInterval, isAfter } from "date-fns";
import { eventsList, type Event } from "@/lib/eventDashboard";
import type { MotorType } from "../../../../prisma/generated/prisma/enums";
import QuotaTrackETU from "./QuotaTrackETU";
import { is } from "date-fns/locale";

export default function EventsListDashboard() {
    return (
        <Suspense fallback={<CompetitionListSkeleton />}>
            <FetchUserAvailableEvents />
        </Suspense>
    );
}

async function FetchUserAvailableEvents() {
    const currentDate = getCurrentDate();
    const user = (await getUser()) as User;

    const stats = await db.eventRegistration.groupBy({
        by: ["motorType"],
        _count: { motorType: true },
    });

    const currentMotorTypeQuota = {
        "MATIC": stats.find((stat) => stat.motorType === "MATIC")?._count.motorType ?? 0,
        "MANUAL": stats.find((stat) => stat.motorType === "MANUAL")?._count.motorType ?? 0,
    }

    const maxQuotaMatic = eventsList.find((event) => event.id === "ETU")?.slotmatic ?? 0;
    const maxQuotaManual = eventsList.find((event) => event.id === "ETU")?.slotmanual ?? 0;
    const ismaticfull = currentMotorTypeQuota.MATIC >= (eventsList.find((event) => event.id === "ETU")?.slotmatic ?? 0);
    const ismanualfull = currentMotorTypeQuota.MANUAL >= (eventsList.find((event) => event.id === "ETU")?.slotmanual ?? 0);

    const registeredEvents = await db.eventRegistration.findMany({
        where: {
            userId: user.id,
        },
        select: {
            eventType: true,
        },
    });
    const eventsAvailableList = eventsList.filter(
        (event) => !registeredEvents.some((e) => e.eventType === event.dbId),
    );

    if (!eventsAvailableList.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <IconListDetails />
                        </EmptyMedia>
                        <EmptyTitle>No Available Events</EmptyTitle>
                        <EmptyDescription>
                            You have registered for all available events.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button className="cursor-pointer" asChild>
                            <Link href="/dashboard/competitions" prefetch>
                                View Registered Events
                            </Link>
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        );
    }

    return (
        <section className="mt-2">
            <h3 className="text-2xl text-foreground font-bold">Available Events</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 items-stretch my-2">
                {eventsAvailableList.map((event) => {
                    function isRegistrationOpen(event: Event, now: Date) {
                        if (!event.startRegDate1 || !event.endRegDate1) return false;

                        const start = wibToUTC(event.startRegDate1);
                        const end = wibToUTC(event.endRegDate1);

                        return isWithinInterval(now, { start, end });
                    }

                    const isOpen = isRegistrationOpen(event, currentDate);
                    const isBeforeStart = isBefore(
                        currentDate,
                        event.startRegDate1 as Date,
                    );
                    return (
                        <Card
                            key={event.id}
                            className="w-full max-w-sm bg-white/5 flex flex-col backdrop-glass-sm"
                        >
                            <CardHeader className="flex flex-col justify-center items-center mb-auto">
                                <CardTitle className="flex items-center gap-2">
                                    {event.title}
                                </CardTitle>
                                <CardDescription className="text-center text-sm line-clamp-1">
                                    {event.desc}
                                </CardDescription>
                                {isOpen ? (
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-600 text-white"
                                    >
                                        Open
                                    </Badge>
                                ) : isBeforeStart ? (
                                    <Badge className="bg-primary/30 text-primary border-primary/50 border">
                                        Upcoming
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Closed</Badge>
                                )}
                            </CardHeader>
                            <CardContent className="flex justify-center items-center grow my-auto">
                                <event.logo className="size-24" />
                            </CardContent>
                            <CardFooter className="flex flex-col justify-center mt-auto">

                                {event.id === "ETU" && (
                                    <>
                                        {!ismaticfull ? <QuotaTrackETU motorType="MATIC" fetchedCurrentQuota={currentMotorTypeQuota.MATIC} maxQuota={maxQuotaMatic}></QuotaTrackETU>: <Badge className="bg-primary/30 text-primary border-primary/50 border  mb-5"><span className="text-sm">Matic: Full</span></Badge>}
                                        {!ismanualfull ? <QuotaTrackETU motorType="MANUAL" fetchedCurrentQuota={currentMotorTypeQuota.MANUAL} maxQuota={maxQuotaManual}></QuotaTrackETU> : <Badge className="bg-primary/30 text-primary border-primary/50 border  mb-5"><span className="text-sm">Manual: Full</span></Badge>}
                                    </>
                                )}

                                <Button
                                    variant="default"
                                    size="sm"
                                    className={cn("gap-1 pr-1.5 cursor-pointer", {
                                        "bg-muted-foreground pointer-events-none cursor-not-allowed":
                                            !isOpen,
                                    })}
                                    disabled={isOpen ? false : true}
                                >
                                    <Link
                                        href={
                                            isOpen ? `/dashboard/events/register/${event.id}` : ""
                                        }
                                        prefetch
                                        className="flex items-center gap-2"
                                    >
                                        <span>Register</span>
                                        <ChevronRight className="size-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
