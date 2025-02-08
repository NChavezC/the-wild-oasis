import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ycstdykzvzjkwsiepfau.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljc3RkeWt6dnpqa3dzaWVwZmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTMwMDksImV4cCI6MjA1NDE2OTAwOX0.hrjFY9Bj6d0AYLL2mAHt9bEfctvo6tqxE69knWNx8I4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
