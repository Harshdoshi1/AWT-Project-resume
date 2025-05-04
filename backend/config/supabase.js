import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL?.trim();
const supabaseKey = process.env.SUPABASE_SERVICE_KEY?.trim();
console.log(supabaseUrl, supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Service Key must be defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

export default supabase;
