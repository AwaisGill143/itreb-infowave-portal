
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { X, Briefcase, Clock, User } from "lucide-react";
import { useOpportunities } from "@/hooks/useOpportunities";
import { useAuth } from "@/hooks/useAuth";

const RemoveOpportunityDialog = () => {
  const { opportunities, deleteOpportunity } = useOpportunities();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Filter opportunities created by the current user
  const userOpportunities = opportunities.filter(opportunity => opportunity.created_by === user?.id);

  const handleDeleteOpportunity = async (opportunityId: string) => {
    await deleteOpportunity(opportunityId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Remove Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Remove Opportunities</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {userOpportunities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You haven't created any opportunities yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {userOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-religious-800 mb-2">
                          {opportunity.job_title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {opportunity.portfolio || 'No Portfolio'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {opportunity.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            Created on {formatDate(opportunity.created_at)}
                          </div>
                        </div>
                        
                        {opportunity.description && (
                          <p className="text-gray-700 text-sm mb-2">
                            {opportunity.description}
                          </p>
                        )}
                        
                        {opportunity.skill_requirement && (
                          <div className="text-sm">
                            <span className="font-medium text-gray-800">Skills Required: </span>
                            <span className="text-gray-700">{opportunity.skill_requirement}</span>
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            opportunity.is_active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {opportunity.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Opportunity</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{opportunity.job_title}"? This action cannot be undone and will also remove all applications for this opportunity.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteOpportunity(opportunity.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Opportunity
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveOpportunityDialog;
