import { redirect } from "next/navigation";
import { EventsName } from "@/constants/constants";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ event: string }>;
}): Promise<Metadata> {
  const event = (await params).event;
  return {
    title: `${event.toUpperCase()} | Mechanical Festival 2026`,
    description: `${event.toUpperCase()} Event Details`,
  };
}

async function CompPage({ params }: { params: Promise<{ event: string }> }) {
  const { event } = await params;
  if (!EventsName.includes(event)) {
    redirect("/events");
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-trasnparent backdrop-glass-lg m-auto h-fit w-full max-w-xl verflow-hidden rounded-[calc(var(--radius)+.125rem)] border-2 shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)] py-4">
        {/*<EventForm event={event} />*/}
        <h1 className="text-center text-4xl lg:text-6xl font-bold">
          COMING SOON
        </h1>
      </div>
    </section>
  );
}

export default CompPage;
