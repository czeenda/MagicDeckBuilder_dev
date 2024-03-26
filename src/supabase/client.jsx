import { createClient } from "@supabase/supabase-js";

const projectURL = "https://wafqodtugwwrcampnrck.supabase.co";
const projectKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZnFvZHR1Z3d3cmNhbXBucmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MDYzMDUsImV4cCI6MjAyNTQ4MjMwNX0.zq0eg2vI8RUhGRUAvhMDewgiKwenHKOUAjNMQ3W3r-4";

export const supabase = createClient(projectURL, projectKey);