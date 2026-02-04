import { Calendar, Users, MapPin, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconConfetti } from "@tabler/icons-react";
import { EmptyMedia } from "../ui/empty";
import { getCurrentDate } from "@/lib/utils";
import { getUser } from "@/action/user.action";
import { db } from "@/server/db";
import { eventsList } from "@/lib/eventDashboard";
import type { User } from "../../../prisma/generated/prisma/client";
import { Suspense } from "react";
import { RegisteredEventsListSkeleton } from "./EventsListSkeleton";

export default function Events() {
  return (
    <Suspense fallback={<RegisteredEventsListSkeleton />}>
      <FetchUserRegisteredEvents />
    </Suspense>
  );
}

export async function FetchUserRegisteredEvents() {
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
  const totalEventsParticipants = await db.eventRegistration.findMany({
    select: {
      eventType: true,
    },
  });
  const eventsRegisteredList = eventsList.filter((event) =>
    registeredEvents.some((e) => e.eventType === event.dbId),
  );

  if (!eventsRegisteredList.length) {
    return (
      <div className="glass-sm p-4 transition-colors flex flex-col justify-center items-center">
        <EmptyMedia variant={"icon"}>
          <IconConfetti />
        </EmptyMedia>
        <h1>No Registered Events</h1>
      </div>
    );
  }

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Registered Events
      </h3>
      <div className="space-y-4">
        {eventsRegisteredList.map((event) => (
          <div
            key={event.id}
            className="glass-sm p-4 hover:bg-card/25 transition-colors rounded-lg border"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h4 className="font-medium text-foreground flex-1">
                {event.title}
              </h4>
              <Badge variant="secondary" className="bg-green-600 text-white">
                Registered
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{event.eventDate}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>
                  {
                    totalEventsParticipants.filter(
                      (e) => e.eventType === event.dbId,
                    ).length
                  }{" "}
                  participants
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
