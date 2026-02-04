import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import { Suspense } from "react";
import CompetitionListSkeleton from "../CompetitionListSkeleton";
import { getCurrentDate } from "@/lib/utils";
import { getUser } from "@/action/user.action";
import { db } from "@/server/db";
import { eventsList } from "@/lib/eventDashboard";
import { type User } from "@/types/types";
import { IconConfetti } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RegisteredEventsList() {
  return (
    <Suspense fallback={<CompetitionListSkeleton />}>
      <FetchUserRegisteredEvents />
    </Suspense>
  );
}

async function FetchUserRegisteredEvents() {
  const currentDate = getCurrentDate();
  const user = (await getUser()) as User;
  const registeredEvents = await db.eventRegistration.findMany({
    where: {
      userId: user.id,
    },
    select: {
      eventType: true,
    },
  });
  const eventsRegisteredList = eventsList.filter((event) =>
    registeredEvents.some((e) => e.eventType === event.dbId),
  );

  if (!eventsRegisteredList.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconConfetti />
          </EmptyMedia>
          <EmptyTitle>No Events Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t registered any events yet.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <Link href="/events" prefetch>
              Learn More <ArrowUpRightIcon />
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <section className="mt-8">
      <h3 className="text-2xl text-foreground font-bold">Registered Events</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 items-stretch my-2">
        {eventsRegisteredList.map((event) => {
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
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Registered
                </Badge>
              </CardHeader>
              <CardContent className="flex justify-center items-center grow my-auto">
                <event.logo className="size-24" />
              </CardContent>
              <CardFooter className="flex flex-col justify-center mt-auto"></CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
