import { createClient } from '@supabase/supabase-js';
const baseUrl = NEXT_PUBLIC_SUPABASE_URL;
const apiKey = NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(
  baseUrl,
  apiKey
);


