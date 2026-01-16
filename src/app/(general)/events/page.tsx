import EventsSection from "@/components/events/events-section";
import EventsHeroSection from "@/components/events/events-hero";

function EventsPage() {
    return (
        <main className="min-h-screen">
            <EventsHeroSection />
            <EventsSection />
        </main>
    );
}

export default EventsPage;
