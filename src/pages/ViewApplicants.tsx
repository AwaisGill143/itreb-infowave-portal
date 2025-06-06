
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Application {
  id: string;
  "First name": string | null;
  "Last Name": string | null;
  email: string | null;
  Contact: number | null;
  Age: number | null;
  Portfolio: string | null;
  "Secular Qualification": string | null;
  "Religious Qualification": string | null;
  Skills: string | null;
  resume_url: string | null;
  status: string;
  applied_at: string;
}

const ViewApplicants = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!profile?.portfolio) {
        toast.error("Portfolio information not available");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('Portfolio', profile.portfolio)
          .order('applied_at', { ascending: false });

        if (error) {
          console.error('Error fetching applications:', error);
          toast.error('Failed to fetch applications');
          return;
        }

        setApplications(data || []);
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [profile?.portfolio]);

  const handleDownloadResume = (resumeUrl: string | null, applicantName: string) => {
    if (!resumeUrl) {
      toast.error("No resume available for this applicant");
      return;
    }
    
    // Open resume in new tab
    window.open(resumeUrl, '_blank');
    toast.success(`Opening resume for ${applicantName}`);
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) {
        console.error('Error updating status:', error);
        toast.error('Failed to update application status');
        return;
      }

      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      toast.success('Application status updated successfully');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  if (!profile || profile.role !== 'board_member') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Access denied. Board members only.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                onClick={() => navigate("/dashboard")}
                variant="ghost"
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 bg-religious-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="ml-2 text-xl font-bold text-religious-800">ITREB</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Applications for {profile.portfolio} Portfolio
          </h1>
          <p className="text-gray-600 mt-1">
            {applications.length} application{applications.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applicant List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-lg">Loading applications...</div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">No applications found for this portfolio.</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Secular Qualification</TableHead>
                      <TableHead>Religious Qualification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          {`${application["First name"] || ''} ${application["Last Name"] || ''}`.trim() || 'N/A'}
                        </TableCell>
                        <TableCell>{application.email || 'N/A'}</TableCell>
                        <TableCell>{application.Contact || 'N/A'}</TableCell>
                        <TableCell>{application.Age || 'N/A'}</TableCell>
                        <TableCell>{application["Secular Qualification"] || 'N/A'}</TableCell>
                        <TableCell>{application["Religious Qualification"] || 'N/A'}</TableCell>
                        <TableCell>
                          <select
                            value={application.status}
                            onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          {new Date(application.applied_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadResume(
                                application.resume_url,
                                `${application["First name"]} ${application["Last Name"]}`
                              )}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // You can expand this to show a detailed view modal
                                toast.info('Detailed view coming soon');
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewApplicants;
