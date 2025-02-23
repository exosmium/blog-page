import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Entry = {
  id: string;
  created_at: string;
  content: string;
  mood: string;
  user_id: string;
  date: string;
};

export type Comment = {
  id: string;
  created_at: string;
  content: string;
  entry_id: string;
  user_id: string;
};

export type Like = {
  id: string;
  created_at: string;
  entry_id: string;
  user_id: string;
};