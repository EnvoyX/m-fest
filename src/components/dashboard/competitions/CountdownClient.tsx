"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Timer, AlertCircle } from "lucide-react";
import Link from "next/link";
import Countdown from "react-countdown";
import type {
  CompRegistration,
  Team,
  User,
} from "../../../../prisma/generated/prisma/client";
import type { Competition } from "@/types/types";
import { cn } from "@/lib/utils";

export default function CountdownClient({
  date,
  description,
  type,
  user,
  comp,
  team,
  registeredCompetition,
}: {
  date: Date;
  description: string;
  type: "compOpenCase" | "submissionDeadline" | "examOpen";
  comp?: Competition;
  user?: User;
  team?: Team;
  registeredCompetition?: CompRegistration;
}) {
  return (
    <Countdown
      date={date}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          if (type === "submissionDeadline") {
            return (
              <div className="flex items-center gap-2 text-destructive font-medium text-sm border border-destructive/20 bg-destructive/5 px-3 py-1 rounded-full">
                <AlertCircle className="size-4" />
                <span>Deadline Passed</span>
              </div>
            );
          }

          const isLeader = team?.leaderUserId === user?.id;
          const isAccepted = team?.teamStatus === "ACCEPTED";
          const isSTEM = comp?.abbreviation === "STEM";
          const isDisabled = !isSTEM && (!isLeader || !isAccepted);

          let btnText = "View Details";
          if (isSTEM) btnText = "Enter Exam";
          else if (!isLeader) btnText = "Only leader can access";
          else if (!isAccepted) btnText = "Team status is pending";

          return (
            <Button
              variant="outline"
              size="sm"
              asChild
              disabled={isDisabled}
              className="h-8 rounded-lg px-4 text-xs shadow-sm transition-all hover:scale-105"
            >
              <Link
                href={`/dashboard/competitions/${registeredCompetition?.id}`}
              >
                {btnText}
                <ChevronRight className="ml-1 size-3" />
              </Link>
            </Button>
          );
        }

        return (
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            {description && (
              <p
                className={cn(
                  "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-1 text-center mx-auto",
                  {
                    "text-destructive": type === "submissionDeadline",
                  },
                )}
              >
                {description}
              </p>
            )}
            <div
              className={cn(
                "flex items-center gap-2 bg-secondary/50 border border-border backdrop-glass-sm px-3 py-1 rounded-full shadow-sm",
                {
                  "bg-red-500/25": type === "submissionDeadline",
                },
              )}
            >
              <Timer
                className={cn("size-3.5 text-muted-foreground", {
                  "text-red-500 animate-pulse": type === "submissionDeadline",
                })}
              />
              <div className="flex items-baseline gap-1 font-mono text-sm font-medium tabular-nums text-foreground">
                {days > 0 && (
                  <>
                    <span>{days}</span>
                    <span className="text-[10px] font-sans text-muted-foreground mr-1">
                      d
                    </span>
                  </>
                )}
                <span>{hours.toString().padStart(2, "0")}</span>
                <span className="text-muted-foreground/50 animate-pulse">
                  :
                </span>
                <span>{minutes.toString().padStart(2, "0")}</span>
                <span className="text-muted-foreground/50 animate-pulse">
                  :
                </span>
                <span>{seconds.toString().padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
