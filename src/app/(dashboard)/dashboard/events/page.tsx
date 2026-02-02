import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Mechanical Festival 2026",
  description: "Mechanical Festival 2026",
};

import RegisteredEventsList from "@/components/dashboard/events/RegisteredEventsList";
import EventsListDashboard from "@/components/dashboard/events/EventsListDashboard";

function EventsPage() {
  return (
    <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between ">
        <h3 className="text-3xl font-bold text-foreground">Events</h3>
      </div>
      <EventsListDashboard />
      <RegisteredEventsList />
    </section>
  );
}

export default EventsPage;
