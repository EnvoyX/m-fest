import { Calendar, Users, MapPin, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconConfetti } from "@tabler/icons-react";
import { EmptyMedia } from "../ui/empty";
import { getCurrentDate } from "@/lib/utils";
import { getUser } from "@/action/user.action";
import { db } from "@/server/db";
import { eventsList } from "@/lib/eventDashboard";
import type { MExpoSessionType, MTalksSessionType, User } from "../../../prisma/generated/prisma/client";
import { Suspense } from "react";
import { RegisteredEventsListSkeleton } from "./EventsListSkeleton";
import { useRouter } from "next/dist/client/components/navigation";
import { events } from "@/lib/event";

export default function Events() {
  return (
    <Suspense fallback={<RegisteredEventsListSkeleton />}>
      <FetchUserRegisteredEvents />
    </Suspense>
  );
}

const talksSessionLabel: Record<string, string> = {
  TALKS_1: "Session 1 - Day 1",
  TALKS_2: "Session 2 - Day 1",
  TALKS_3: "Session 1 - Day 2",
  TALKS_4: "Session 2 - Day 2",
};

const talksPresenceKey: Record<string, "talksSession1Presence" | "talksSession2Presence" | "talksSession3Presence" | "talksSession4Presence"> = {
  TALKS_1: "talksSession1Presence",
  TALKS_2: "talksSession2Presence",
  TALKS_3: "talksSession3Presence",
  TALKS_4: "talksSession4Presence",
};

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

  //console.log("Registered Events:", eventsRegisteredList);

  let mTalksSessions: {
    talksSessions: MTalksSessionType[];
    talksSession1Presence: boolean | null;
    talksSession2Presence: boolean | null;
    talksSession3Presence: boolean | null;
    talksSession4Presence: boolean | null;
  }[] = [];

  const expoSessionLabel: Record<string, string> = {
    EXPO_DAY_1: "Day 1",
    EXPO_DAY_2: "Day 2",
  };

  const expoPresenceKey: Record<string, "expoDay1Presence" | "expoDay2Presence"> = {
    EXPO_DAY_1: "expoDay1Presence",
    EXPO_DAY_2: "expoDay2Presence",
  };
  
  if (eventsRegisteredList.some((event) => event.id === "M-TALKS")) {
    mTalksSessions = await db.eventRegistration.findMany({
      where: {
        userId: user.id,
        eventType: "M_TALKS",
      },
      select: {
        talksSessions: true,
        talksSession1Presence: true,
        talksSession2Presence: true,
        talksSession3Presence: true,
        talksSession4Presence: true,
      },
    });
  }

let mExpoSessions: {
  expoSessions: MExpoSessionType[];
  expoDay1Presence: boolean | null;
  expoDay2Presence: boolean | null;
}[] = [];

if (eventsRegisteredList.some((event) => event.id === "M-EXPO")) {
  mExpoSessions = await db.eventRegistration.findMany({
    where: {
      userId: user.id,
      eventType: "M_EXPO",
    },
    select: {
      expoSessions: true,
      expoDay1Presence: true,
      expoDay2Presence: true,
    },
  });
}

  //console.log("M-TALKS Sessions:", mTalksSessions);


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
            <div className="grid grid-cols-2">
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
              {event.id === "M-TALKS" && mTalksSessions.length > 0 && (
                <div className="flex flex-col gap-2 text-sm">
                  <span className="text-muted-foreground font-medium">Sessions:</span>
                  {mTalksSessions.flatMap((session) =>
                    session.talksSessions.map((s) => {
                      const presenceKey = talksPresenceKey[s];
                      const isPresent = presenceKey ? session[presenceKey] === true : false;
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-xs w-fit ${isPresent ? "border-green-600 text-green-600" : "border-muted text-muted-foreground"}`}>
                            {talksSessionLabel[s] ?? s} • {isPresent ? "Checked In" : "Not Checked In"}
                          </Badge>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
              {event.id === "M-EXPO" && mExpoSessions.length > 0 && (
              <div className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground font-medium">Sessions:</span>
                {mExpoSessions.flatMap((session) =>
                  session.expoSessions.map((s) => {
                    const presenceKey = expoPresenceKey[s];
                    const isPresent = presenceKey ? session[presenceKey] === true : false;
                    return (
                      <Badge
                        key={s}
                        variant="outline"
                        className={`text-xs w-fit ${isPresent ? "border-green-600 text-green-600" : "border-muted text-muted-foreground"}`}
                      >
                        {expoSessionLabel[s] ?? s} • {isPresent ? "Checked In" : "Not Checked In"}
                      </Badge>
                    );
                  })
                )}
              </div>
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
