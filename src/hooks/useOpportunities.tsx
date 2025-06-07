
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

// Use the actual Portfolio_type from the database schema
type PortfolioType = Database['public']['Enums']['Portfolio_type'];

interface Opportunity {
  id: string;
  job_title: string;
  description: string;
  duration: string;
  portfolio: PortfolioType | null;
  skill_requirement: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const useOpportunities = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error loading opportunities:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const addOpportunity = async (opportunityData: Omit<Opportunity, 'id' | 'created_by' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([{
          ...opportunityData,
          created_by: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      setOpportunities(prev => [data, ...prev]);
      toast.success('Opportunity created successfully');
      return data;
    } catch (error) {
      console.error('Error adding opportunity:', error);
      toast.error('Failed to create opportunity');
      throw error;
    }
  };

  const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setOpportunities(prev => prev.map(opp => opp.id === id ? data : opp));
      toast.success('Opportunity updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast.error('Failed to update opportunity');
      throw error;
    }
  };

  const deleteOpportunity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setOpportunities(prev => prev.filter(opp => opp.id !== id));
      toast.success('Opportunity deleted successfully');
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast.error('Failed to delete opportunity');
    }
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  return {
    opportunities,
    loading,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    refreshOpportunities: loadOpportunities
  };
};
