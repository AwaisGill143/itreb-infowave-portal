
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Download, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";
import TodoList from "@/components/TodoList";
import RemoveEventDialog from "@/components/RemoveEventDialog";
import RemoveOpportunityDialog from "@/components/RemoveOpportunityDialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const { events } = useEvents();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleViewApplicants = () => {
    if (profile?.role !== 'board_member') {
      toast.error("Only board members can view applicants");
      return;
    }
    navigate("/view-applicants");
  };

  const handleResourceLibrary = () => {
    console.log("Downloading resource library PDF");
    toast.success("Downloading resource library PDF");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  // Get events for the selected date
  const selectedDateEvents = events.filter(event => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.event_date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-religious-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="ml-2 text-xl font-bold text-religious-800">ITREB</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {profile.role === 'board_member' && (
                <>
                  <Button 
                    onClick={() => navigate("/create-opportunity")}
                    className="bg-religious-600 hover:bg-religious-700"
                  >
                    Create Opportunity
                  </Button>
                  <RemoveOpportunityDialog />
                  <Button 
                    onClick={handleViewApplicants}
                    variant="outline"
                    className="border-religious-600 text-religious-600 hover:bg-religious-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View Applicants
                  </Button>
                </>
              )}
              <Button 
                onClick={handleResourceLibrary}
                variant="outline"
                className="border-religious-600 text-religious-600 hover:bg-religious-50"
              >
                Resource Library
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Hello {profile.full_name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {profile.role === 'board_member' 
              ? `${profile.portfolio} Portfolio` 
              : 'Welcome to ITREB'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
                
                {/* Show events for selected date */}
                {selectedDate && selectedDateEvents.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Events on {selectedDate.toLocaleDateString()}
                    </h3>
                    <div className="space-y-2">
                      {selectedDateEvents.map((event) => (
                        <div key={event.id} className="p-3 bg-religious-50 rounded-lg">
                          <h4 className="font-medium text-religious-800">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.start_time} - {event.end_time} at {event.venue}
                          </p>
                          {event.description && (
                            <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Event Actions - Only for board members */}
                {profile.role === 'board_member' && (
                  <div className="flex gap-4 mt-6">
                    <Button 
                      onClick={() => navigate("/add-event")}
                      className="bg-religious-600 hover:bg-religious-700"
                    >
                      Add Event
                    </Button>
                    <RemoveEventDialog />
                    <Button variant="outline">
                      Add Images
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Todo List Section */}
          <div className="lg:col-span-3">
            <TodoList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
