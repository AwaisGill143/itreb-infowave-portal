
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OpportunitiesSection = () => {
  const [expandedOpportunity, setExpandedOpportunity] = useState<number | null>(null);

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

  return (
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
  );
};

export default OpportunitiesSection;
