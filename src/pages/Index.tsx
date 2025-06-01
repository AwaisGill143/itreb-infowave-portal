
import { useState, useEffect } from "react";
import { ChevronDown, ArrowRight, Calendar, Users, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedOpportunity, setExpandedOpportunity] = useState<number | null>(null);

  const whatsNewSlides = [
    {
      image: "/lovable-uploads/5f16b4c8-ffdc-409e-b26b-2d39a0129655.png",
      title: "New Community Initiative Launch",
      text: "Join us in our latest community outreach program"
    },
    {
      image: "/lovable-uploads/0e822d16-6581-441a-88df-1eccd5d3a275.png",
      title: "Educational Workshop Series",
      text: "Enhance your skills with our comprehensive workshops"
    },
    {
      image: "/lovable-uploads/18b33cb0-b583-4e4e-b6a8-73d1ecd2ecb1.png",
      title: "Annual Conference 2024",
      text: "Register now for our biggest event of the year"
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Gathering",
      date: "June 15, 2025",
      location: "Main Hall",
      description: "Monthly community meeting and discussion"
    },
    {
      title: "Educational Seminar",
      date: "June 22, 2025",
      location: "Conference Room",
      description: "Learning session on contemporary issues"
    },
    {
      title: "Youth Workshop",
      date: "June 30, 2025",
      location: "Activity Center",
      description: "Special workshop designed for young members"
    },
    {
      title: "Annual Conference",
      date: "July 5, 2025",
      location: "Grand Auditorium",
      description: "Our biggest annual gathering"
    }
  ];

  const opportunities = [
    {
      title: "Community Coordinator",
      location: "Remote/On-site",
      type: "Full-time",
      description: "Lead community initiatives and coordinate events. Work closely with our team to organize meaningful programs that serve our community members and promote spiritual growth."
    },
    {
      title: "Educational Content Developer",
      location: "Remote",
      type: "Part-time",
      description: "Create engaging educational materials and resources for our community. Develop curricula, write articles, and design interactive learning experiences."
    },
    {
      title: "Youth Program Manager",
      location: "On-site",
      type: "Full-time",
      description: "Manage youth programs and activities. Design age-appropriate educational and recreational activities that align with our organizational values and mission."
    }
  ];

  const achievements = [
    {
      name: "Sarah Ahmed",
      role: "Community Leader",
      image: "/placeholder.svg",
      description: "Leading community outreach programs for over 5 years"
    },
    {
      name: "Dr. Hassan Ali",
      role: "Educational Director",
      image: "/placeholder.svg",
      description: "Expert in curriculum development and educational leadership"
    },
    {
      name: "Fatima Khan",
      role: "Youth Coordinator",
      image: "/placeholder.svg",
      description: "Passionate about youth development and mentorship"
    },
    {
      name: "Omar Ibrahim",
      role: "Program Manager",
      image: "/placeholder.svg",
      description: "Specialized in event management and community engagement"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % whatsNewSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-religious-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-religious-600 to-religious-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-2xl font-bold text-religious-800">ITREB</span>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="border-religious-600 text-religious-700 hover:bg-religious-50"
              onClick={() => window.location.href = '/join'}
            >
              Join ITREB
            </Button>
            <Button 
              className="bg-religious-600 hover:bg-religious-700"
              onClick={() => window.location.href = '/login'}
            >
              Log In
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="bg-religious-600 text-white sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-8 py-4">
            <button 
              onClick={() => scrollToSection('upcoming-events')}
              className="hover:text-religious-200 transition-colors flex items-center space-x-1"
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Events</span>
            </button>
            <button 
              onClick={() => scrollToSection('opportunities')}
              className="hover:text-religious-200 transition-colors flex items-center space-x-1"
            >
              <Briefcase className="w-4 h-4" />
              <span>Opportunities</span>
            </button>
            <button 
              onClick={() => scrollToSection('achievements')}
              className="hover:text-religious-200 transition-colors flex items-center space-x-1"
            >
              <Users className="w-4 h-4" />
              <span>Achievements</span>
            </button>
          </div>
        </div>
      </nav>

      {/* What's New Section */}
      <section className="py-16 bg-gradient-to-r from-religious-50 to-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">What's New</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              {whatsNewSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative h-full bg-gradient-to-r from-religious-600 to-religious-800 flex items-center">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 text-white p-12 max-w-2xl">
                      <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-xl opacity-90">{slide.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {whatsNewSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-religious-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="upcoming-events" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Upcoming Events</h2>
          <div className="relative">
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="w-80 flex-shrink-0 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-full h-40 bg-gradient-to-br from-religious-100 to-religious-200 rounded-lg mb-4 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-religious-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-religious-800 mb-2">{event.title}</h3>
                      <p className="text-religious-600 mb-1">{event.date}</p>
                      <p className="text-gray-600 mb-3">{event.location}</p>
                      <p className="text-gray-700">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-16 bg-religious-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Opportunities</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedOpportunity(expandedOpportunity === index ? null : index)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-religious-800">{opportunity.title}</h3>
                      <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                        <span>{opportunity.location}</span>
                        <span>•</span>
                        <span>{opportunity.type}</span>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-religious-600 transition-transform ${
                        expandedOpportunity === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {expandedOpportunity === index && (
                    <div className="mt-6 animate-fade-in">
                      <p className="text-gray-700 mb-4">{opportunity.description}</p>
                      <Button className="bg-religious-600 hover:bg-religious-700">
                        Apply Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((person, index) => (
              <div key={index} className="text-center animate-fade-in">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-religious-200 to-religious-300 flex items-center justify-center overflow-hidden">
                  <div className="w-24 h-24 bg-religious-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{person.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-religious-800 mb-1">{person.name}</h3>
                <p className="text-religious-600 font-medium mb-2">{person.role}</p>
                <p className="text-gray-600 text-sm">{person.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-religious-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 bg-religious-600 hover:bg-religious-700 px-6 py-3 rounded-lg transition-colors"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="mt-8 pt-8 border-t border-religious-700">
            <p className="text-religious-200">&copy; 2025 ITREB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
