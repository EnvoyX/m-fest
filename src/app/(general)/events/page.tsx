import EventsSection from "@/components/events/events-section";
import EventsHeroSection from "@/components/events/events-hero";

export const metadata = {
  title: "Events | Mechanical Festival 2026",
  description:
    "Events of Mechanical Festival 2026 | Join us in our events to experience world of mechanical engineering, and learn from the best.",
};

function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsHeroSection />
      <EventsSection />
    </main>
  );
}

export default EventsPage;
