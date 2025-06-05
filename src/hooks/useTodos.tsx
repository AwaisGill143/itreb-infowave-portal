
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Todo {
  id: string;
  content: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error loading todos:', error);
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (content: string) => {
    if (!user || !content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{
          user_id: user.id,
          content: content.trim(),
          completed: false
        }])
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => [data, ...prev]);
      toast.success('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to add todo');
    }
  };

  const updateTodo = async (id: string, updates: Partial<Pick<Todo, 'content' | 'completed'>>) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo));
      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: loadTodos
  };
};
