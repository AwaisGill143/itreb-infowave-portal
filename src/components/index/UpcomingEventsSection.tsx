
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
}

interface UpcomingEventsSectionProps {
  events: Event[];
  loading: boolean;
}

const UpcomingEventsSection = ({ events, loading }: UpcomingEventsSectionProps) => {
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter events to show only upcoming events (future dates)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }).slice(0, 4);

  return (
    <section id="upcoming-events" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Upcoming Events</h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading events...</div>
        ) : upcomingEvents.length > 0 ? (
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="w-80 flex-shrink-0 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-full h-40 bg-gradient-to-br from-religious-100 to-religious-200 rounded-lg mb-4 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-religious-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-religious-800 mb-2">{event.title}</h3>
                      <p className="text-religious-600 mb-1">{formatEventDate(event.event_date)}</p>
                      <p className="text-gray-600 mb-1">{event.start_time} - {event.end_time}</p>
                      <p className="text-gray-600 mb-3">{event.venue}</p>
                      {event.description && (
                        <p className="text-gray-700">{event.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">No upcoming events found.</div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
