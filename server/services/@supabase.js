import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vgvkuskuhjjxyafyrwyp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndmt1c2t1aGpqeHlhZnlyd3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkyMTY1MDIsImV4cCI6MTk3NDc5MjUwMn0.ZO5l1VqccIcgdq2OsBNpEE7In6ONbUzbAuG9AjNo3QY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
