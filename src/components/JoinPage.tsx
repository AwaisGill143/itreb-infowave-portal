
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Database } from '@/integrations/supabase/types';

// Use the actual Portfolio_type from the database schema
type PortfolioType = Database['public']['Enums']['Portfolio_type'];

const JoinPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const opportunityId = searchParams.get('opportunityId');
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    age: "",
    secularQualification: "",
    religiousQualification: "",
    portfolio: null as PortfolioType | null,
    skills: "",
    cv: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Portfolio options matching the Portfolio_type enum from Supabase
  const portfolioOptions: PortfolioType[] = [
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

  // Load opportunity details if opportunityId is provided
  useEffect(() => {
    if (opportunityId) {
      loadOpportunityDetails(opportunityId);
    }
  }, [opportunityId]);

  const loadOpportunityDetails = async (id: string) => {
    try {
      const { data: opportunity, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading opportunity:', error);
        toast.error('Failed to load opportunity details');
        return;
      }

      if (opportunity && opportunity.portfolio) {
        setFormData(prev => ({
          ...prev,
          portfolio: opportunity.portfolio as PortfolioType
        }));
      }
    } catch (error) {
      console.error('Error loading opportunity:', error);
      toast.error('Failed to load opportunity details');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Updating ${field} with value:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePortfolioChange = (value: PortfolioType) => {
    console.log(`Updating portfolio with value:`, value);
    setFormData(prev => ({ ...prev, portfolio: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log('File selected:', file?.name, 'Size:', file?.size, 'Type:', file?.type);
    
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, DOC, or DOCX file');
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const validateForm = () => {
    console.log('Validating form with data:', formData);
    
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    
    if (!formData.contactNumber.trim()) {
      toast.error('Contact number is required');
      return false;
    }
    
    if (!formData.age.trim()) {
      toast.error('Age is required');
      return false;
    }
    
    if (!formData.portfolio) {
      toast.error('Please select a portfolio');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate age is a number
    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      toast.error('Please enter a valid age between 18 and 100');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    if (!formData.portfolio) {
      toast.error('Please select a portfolio');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Starting application submission...');

      // Upload CV if provided
      let resumeUrl = null;
      if (formData.cv) {
        console.log('Uploading CV...', formData.cv.name);
        
        // Create a unique filename with timestamp
        const fileExt = formData.cv.name.split('.').pop();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${formData.firstName.replace(/\s+/g, '')}-${formData.lastName.replace(/\s+/g, '')}.${fileExt}`;
        
        console.log('Uploading file as:', fileName);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, formData.cv, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Error uploading CV:', uploadError);
          toast.error(`Failed to upload CV: ${uploadError.message}`);
          return;
        }

        console.log('Upload successful:', uploadData);

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        resumeUrl = urlData.publicUrl;
        console.log('CV uploaded successfully:', resumeUrl);
      }

      // Prepare application data with better contact number handling
      const contactNum = formData.contactNumber.replace(/\D/g, ''); // Remove non-digits
      const applicationData = {
        opportunity_id: opportunityId || null, // Use the opportunity ID from URL or null for general applications
        applicant_id: '00000000-0000-0000-0000-000000000000', // System user for now
        'First name': formData.firstName.trim(),
        'Last Name': formData.lastName.trim(),
        email: formData.email.trim(),
        Contact: contactNum ? parseFloat(contactNum) : null,
        Age: parseInt(formData.age),
        Portfolio: formData.portfolio,
        'Secular Qualification': formData.secularQualification.trim() || null,
        'Religious Qualification': formData.religiousQualification.trim() || null,
        Skills: formData.skills.trim() || null,
        resume_url: resumeUrl,
        status: 'pending'
      };

      console.log('Inserting application data:', applicationData);

      // Insert application data
      const { error: insertError } = await supabase
        .from('applications')
        .insert(applicationData);

      if (insertError) {
        console.error('Error inserting application:', insertError);
        toast.error('Failed to submit application. Please check all fields and try again.');
        return;
      }

      console.log('Application submitted successfully');
      toast.success('Application submitted successfully! We will get back to you soon.');
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        age: "",
        secularQualification: "",
        religiousQualification: "",
        portfolio: null,
        skills: "",
        cv: null
      });

      // Reset file input
      const fileInput = document.getElementById('cv') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-religious-50 to-white py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-religious-600 to-religious-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-3xl font-bold text-religious-800">ITREB</span>
          </div>
          <h1 className="text-4xl font-bold text-religious-800 mb-4">
            {opportunityId ? 'Apply for Opportunity' : 'Join Our Community'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {opportunityId 
              ? 'Complete this form to apply for the selected opportunity.' 
              : 'We welcome individuals who are passionate about serving the community and making a positive impact. Please fill out this form to begin your journey with ITREB.'
            }
          </p>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="bg-gradient-to-r from-religious-600 to-religious-700 text-white">
            <CardTitle className="text-2xl text-center">
              {opportunityId ? 'Opportunity Application' : 'Membership Application'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-religious-700 font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-religious-700 font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-religious-700 font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-religious-700 font-medium">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-religious-700 font-medium">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-religious-700 font-medium">Portfolio *</Label>
                  <Select 
                    value={formData.portfolio || ""} 
                    onValueChange={handlePortfolioChange}
                    required
                  >
                    <SelectTrigger className="border-gray-300 focus:border-religious-500 focus:ring-religious-500">
                      <SelectValue placeholder="Select your area of interest" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {portfolioOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-2">
                <Label htmlFor="secularQualification" className="text-religious-700 font-medium">Secular Qualification</Label>
                <Input
                  id="secularQualification"
                  value={formData.secularQualification}
                  onChange={(e) => handleInputChange("secularQualification", e.target.value)}
                  placeholder="e.g., Bachelor's in Computer Science, MBA, etc."
                  className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="religiousQualification" className="text-religious-700 font-medium">Religious Qualification</Label>
                <Input
                  id="religiousQualification"
                  value={formData.religiousQualification}
                  onChange={(e) => handleInputChange("religiousQualification", e.target.value)}
                  placeholder="e.g., Islamic Studies, Religious certification, etc."
                  className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-religious-700 font-medium">Skills & Expertise</Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  placeholder="Describe your skills, experience, and how you can contribute to our community..."
                  className="border-gray-300 focus:border-religious-500 focus:ring-religious-500 min-h-[120px]"
                  rows={5}
                />
              </div>

              {/* CV Upload */}
              <div className="space-y-2">
                <Label htmlFor="cv" className="text-religious-700 font-medium">Upload CV</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-religious-400 transition-colors">
                  <input
                    id="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="cv" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {formData.cv ? formData.cv.name : "Click to upload your CV"}
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-religious-600 hover:bg-religious-700 text-white py-3 text-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/')}
            className="text-religious-600 hover:text-religious-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
