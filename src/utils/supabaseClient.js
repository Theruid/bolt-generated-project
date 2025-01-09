import { createClient } from '@supabase/supabase-js';
    
    const supabaseUrl = 'https://hdochbqbbngcqdalgkjs.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkb2NoYnFiYm5nY3FkYWxna2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTE3NjgsImV4cCI6MjA1MjAyNzc2OH0.4BB41p8JtV3z_jLC2DHNbAe6cB5xettZDY2p4lSIG0w';
    
    export const supabase = createClient(supabaseUrl, supabaseKey);
    
    export const getCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');
    
        if (error) {
          console.error('Error fetching categories:', error);
          return [];
        }
        return data;
      } catch (err) {
        console.error('Unexpected error:', err);
        return [];
      }
    };
    
    export const addCategory = async (category) => {
      try {
        const { error } = await supabase
          .from('categories')
          .insert([category]);
    
        if (error) {
          console.error('Error adding category:', error);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };
    
    export const deleteCategory = async (id) => {
      try {
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);
    
        if (error) {
          console.error('Error deleting category:', error);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };
    
    export const updateCategory = async (id, updatedCategory) => {
      try {
        const { error } = await supabase
          .from('categories')
          .update(updatedCategory)
          .eq('id', id);
    
        if (error) {
          console.error('Error updating category:', error);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };
