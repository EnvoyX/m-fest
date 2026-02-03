import EtuForm from "@/components/dashboard/events/ETU-form";
import MCareForm from "@/components/dashboard/events/M-Care-form";
import MRunForm from "@/components/dashboard/events/M-Run-form";
import MTalksForm from "@/components/dashboard/events/M-Talks-form";
import { CompRegisterFormSkeleton } from "@/components/register/CompFormSkeleton";
import { eventsList, type Event } from "@/lib/eventDashboard";
import { getCurrentDate, isEventOpen } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const event = (await params).event;
  return {
    title: `Register ${event.toUpperCase()} | Mechanical Festival 2026`,
    description: `Register for ${event.toUpperCase()} Event`,
  };
}
export default function RegisterEventPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-transparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden">
        <div className="bg-transparent backdrop-glass-lg ">
          <Suspense fallback={<CompRegisterFormSkeleton />}>
            <FetchEventForm params={params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function FetchEventForm({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event } = await params;
  const currentDate = getCurrentDate();
  const isMTalksOpen = isEventOpen(
    eventsList.find((e) => e.id === "M-TALKS") as Event,
    currentDate,
  );
  const isMCareOpen = isEventOpen(
    eventsList.find((e) => e.id === "M-CARE") as Event,
    currentDate,
  );
  const isEtuOpen = isEventOpen(
    eventsList.find((e) => e.id === "ETU") as Event,
    currentDate,
  );
  const isMRunOpen = isEventOpen(
    eventsList.find((e) => e.id === "M-RUN") as Event,
    currentDate,
  );
  if (event === "M-TALKS" && !isMTalksOpen) {
    redirect("/dashboard/events");
  }
  if (event === "M-CARE" && !isMCareOpen) {
    redirect("/dashboard/events");
  }
  if (event === "ETU" && !isEtuOpen) {
    redirect("/dashboard/events");
  }
  if (event === "M-RUN" && !isMRunOpen) {
    redirect("/dashboard/events");
  }

  return (
    <>
      {event === "M-TALKS" && <MTalksForm />}
      {event === "M-CARE" && <MCareForm />}
      {event === "ETU" && <EtuForm />}
      {event === "M-RUN" && <MRunForm />}
    </>
  );
}
