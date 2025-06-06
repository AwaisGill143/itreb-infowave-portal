
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { toast } from "sonner";

const AddEvent = () => {
  const navigate = useNavigate();
  const { addEvent, loading } = useEvents();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    startTime: "",
    endTime: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePostEvent = async () => {
    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.venue || !eventData.startTime || !eventData.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addEvent({
        title: eventData.title,
        description: eventData.description || null,
        event_date: eventData.date,
        venue: eventData.venue,
        start_time: eventData.startTime,
        end_time: eventData.endTime,
        image_urls: null
      });
      
      navigate("/dashboard");
    } catch (error) {
      // Error is already handled in the useEvents hook
      console.error("Failed to create event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Events</h1>
            </div>
            <Button 
              onClick={handlePostEvent}
              disabled={loading}
              className="bg-religious-600 hover:bg-religious-700"
            >
              {loading ? "Posting..." : "Post Event"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Event Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={eventData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={eventData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                value={eventData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="Enter venue"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={eventData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Ending Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handlePostEvent}
                disabled={loading}
                className="bg-religious-600 hover:bg-religious-700 px-8"
              >
                {loading ? "Posting..." : "Post Event"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddEvent;
