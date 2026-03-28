import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust check for valid Supabase configuration
const isValidConfig = (url: string | undefined, key: string | undefined) => {
  if (!url || !key) return false;
  if (url.includes('your_supabase_url')) return false;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const supabase = isValidConfig(supabaseUrl, supabaseAnonKey) 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
