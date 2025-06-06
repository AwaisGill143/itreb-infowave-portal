
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOpportunities } from "@/hooks/useOpportunities";

const OpportunitiesSection = () => {
  const [expandedOpportunity, setExpandedOpportunity] = useState<number | null>(null);
  const { opportunities, loading } = useOpportunities();

  // Filter only active opportunities for public display
  const activeOpportunities = opportunities.filter(opp => opp.is_active);

  if (loading) {
    return (
      <section id="opportunities" className="py-16 bg-religious-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Opportunities</h2>
          <div className="max-w-4xl mx-auto">
            <div className="text-center text-gray-600">Loading opportunities...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="opportunities" className="py-16 bg-religious-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-religious-800 mb-12">Opportunities</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {activeOpportunities.length === 0 ? (
            <div className="text-center text-gray-600">No opportunities available at the moment.</div>
          ) : (
            activeOpportunities.map((opportunity, index) => (
              <Card key={opportunity.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedOpportunity(expandedOpportunity === index ? null : index)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-religious-800">{opportunity.job_title}</h3>
                      <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                        <span>{opportunity.portfolio}</span>
                        <span>•</span>
                        <span>{opportunity.duration}</span>
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
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Required Skills:</h4>
                        <p className="text-gray-700">{opportunity.skill_requirement}</p>
                      </div>
                      <Button className="bg-religious-600 hover:bg-religious-700">
                        Apply Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
