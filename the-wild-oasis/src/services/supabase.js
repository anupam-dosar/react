import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hcvykedgihdvdpbwqufh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjdnlrZWRnaWhkdmRwYndxdWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MTQwNjQsImV4cCI6MjA0OTM5MDA2NH0.sF4IRvVRodMXINnnnSeCbp9kY8kDUrPVRXHXCGvX64k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
