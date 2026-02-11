import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CompetitionName } from "../../../prisma/generated/prisma/enums";
import { IconListDetails, IconUsersGroup } from "@tabler/icons-react";
import { Avatar } from "@heroui/react";
import { competitions } from "@/lib/competition";
import { EmptyMedia } from "../ui/empty";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { db } from "@/server/db";
import { getUser } from "@/action/user.action";
import type { TeamMember } from "../../../prisma/generated/prisma/client";
import { Suspense } from "react";

export default function Competitions() {
  return (
    <>
      <Suspense
        fallback={
          <div className="glass p-6">
            <Skeleton className="h-7 w-32 mb-6" />

            <div className="space-y-4 border-2 rounded-lg bg-transparent backdrop-glass-lg">
              <div className="glass-sm p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Skeleton className="w-5 h-5 mt-0.5 shrink-0 rounded-md" />

                    <div className="space-y-2 w-full">
                      <Skeleton className="h-5 w-[70%]" />
                      <Skeleton className="h-3 w-[40%]" />
                    </div>
                  </div>

                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/20">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-md" />
                    <Skeleton className="h-5 w-24" />
                  </div>

                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton
                        key={i}
                        className="h-10 w-10 rounded-full ring-2 ring-card"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <FetchCompInfo />
      </Suspense>
      ;
    </>
  );
}

async function FetchCompInfo() {
  const user = await getUser();

  const comp = await db.compRegistration.findFirst({
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

  if (!comp) {
    return (
      <div className="glass p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Competition
        </h3>
        <div
          className={cn("space-y-4", {
            " border-2 rounded-lg bg-transparent backdrop-glass-lg": comp,
          })}
        >
          <div className="glass-sm p-4 transition-colors flex flex-col justify-center items-center">
            <EmptyMedia variant={"icon"}>
              <IconListDetails />
            </EmptyMedia>
            <h1>No Registered Competition</h1>
            <Button className={"mt-2"} asChild>
              <Link href={"/dashboard/team"}>Register Now</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalRegisteredComp = await db.compRegistration.findMany({
    where: {
      competitionName: comp?.competitionName,
    },
    include: {
      team: {
        include: {
          members: true,
        },
      },
    },
  });
  const team = await db.team.findUnique({
    where: { id: comp?.teamId as string },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  const compMembers = totalRegisteredComp.map(
    (comp) => comp.team?.members as TeamMember[],
  );
  const totalCompPartcitipants = compMembers.reduce(
    (acc, curr: TeamMember[]) => acc + curr?.length,
    0,
  );

  const getStatusColor = (status: boolean) => {
    return status
      ? "bg-green-600 text-white border-muted/50"
      : "bg-yellow-500 text-white border-accent/50";
  };

  return (
    <div className="glass p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Competition
      </h3>
      <div className="space-y-4 border-2 rounded-lg bg-transparent backdrop-glass-lg">
        <div className="glass-sm p-4 transition-colors">
          <div className="flex items-start justify-between max-sm:flex-col-reverse max-sm:items-center max-sm:justify-center gap-4 mb-3">
            <div className="flex items-start max-sm:flex-col max-sm:items-center max-sm:justify-center gap-3 flex-1">
              <Trophy className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium text-foreground text-center">
                  {
                    competitions.find(
                      (c) => c.abbreviation === comp?.competitionName,
                    )?.title
                  }
                </h4>
                <p className="text-sm text-muted-foreground mt-1 max-sm:text-center">
                  {totalCompPartcitipants} participants
                </p>
              </div>
            </div>
            <Badge
              className={`${getStatusColor(
                comp?.isVerified as boolean,
              )} border`}
            >
              {comp?.isVerified ? "Payment Verified" : "Payment Pending"}
            </Badge>
          </div>
          <div className="flex items-center justify-between max-sm:flex-col max-sm:justify-center max-sm:gap-4 mt-3 pt-3 border-t border-border/20">
            <div className="flex items-center gap-2">
              <IconUsersGroup className="w-5 h-5 text-primary" />
              <span className="text-base font-semibold text-foreground line-clamp-1">
                {comp?.teamName}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary">
              <div className="flex -space-x-2">
                {team?.members.map((member) => (
                  <Avatar key={member.user.id} className="ring-2 ring-card">
                    <Avatar.Image
                      alt={member.user.name}
                      src={member.user.image as string}
                    />
                    <Avatar.Fallback>
                      {member.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar.Fallback>
                  </Avatar>
                ))}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
