import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY ?? "";
export const supabase = createClient(supabaseUrl, supabaseKey, options);
