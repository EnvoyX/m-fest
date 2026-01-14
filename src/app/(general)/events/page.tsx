import EventsSection from "@/components/events";
import EventsHeroSection from "@/components/events/events-hero";

function EventsPage() {
  return (
    <main className="min-h-screen bg-[#252132] bg-cover bg-center bg-fixed">
      <EventsHeroSection />
      <EventsSection />
    </main>
  );
}

export default EventsPage;
