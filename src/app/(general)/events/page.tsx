import EventsSection from "@/components/events";
import EventsHeroSection from "@/components/events/events-hero";

function EventsPage() {
  return (
    <main className="min-h-screen bg-[url('/fixed-background.png')] bg-cover bg-center bg-fixed">
      <EventsHeroSection />
      <EventsSection />
    </main>
  );
}

export default EventsPage;
