
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const { addOpportunity } = useOpportunities();
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [opportunityData, setOpportunityData] = useState({
    jobTitle: "",
    description: "",
    duration: "",
    skillRequirement: "",
    portfolio: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setOpportunityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePostOpportunity = async () => {
    if (!profile) {
      toast.error("You must be logged in to create opportunities");
      return;
    }

    if (!opportunityData.jobTitle || !opportunityData.description || !opportunityData.duration || !opportunityData.skillRequirement || !opportunityData.portfolio) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await addOpportunity({
        job_title: opportunityData.jobTitle,
        description: opportunityData.description,
        duration: opportunityData.duration,
        skill_requirement: opportunityData.skillRequirement,
        portfolio: opportunityData.portfolio as any,
        is_active: true
      });
      
      toast.success("Opportunity posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting opportunity:", error);
      toast.error("Failed to post opportunity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const portfolioOptions = [
    "Office Bearers",
    "Finance",
    "MIS and Access",
    "RECCU",
    "REDU",
    "Waez Unit",
    "IREU",
    "Academics",
    "Youth",
    "Jamati Affairs",
    "Communications",
    "MNE",
    "HRE",
    "PEDU",
    "HR",
    "Library and ICT",
    "Access",
    "ECD",
    "Distance Learning",
    "STEP",
    "PSU",
    "SFC",
    "Quran",
    "Special HRE"
  ];

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
              <h1 className="text-xl font-semibold text-gray-900">Create Opportunity</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Opportunity Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={opportunityData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="Enter job title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio *</Label>
              <Select
                value={opportunityData.portfolio}
                onValueChange={(value) => handleInputChange("portfolio", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  {portfolioOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={opportunityData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter job description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={opportunityData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 6 months, 1 year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillRequirement">Skill Requirement *</Label>
              <Textarea
                id="skillRequirement"
                value={opportunityData.skillRequirement}
                onChange={(e) => handleInputChange("skillRequirement", e.target.value)}
                placeholder="Enter required skills and qualifications"
                rows={3}
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handlePostOpportunity}
                disabled={loading}
                className="bg-religious-600 hover:bg-religious-700 px-8"
              >
                {loading ? "Posting..." : "Post Opportunity"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateOpportunity;
