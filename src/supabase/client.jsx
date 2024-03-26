import { createClient } from "@supabase/supabase-js";

const projectURL = VITE_SUPABASE_PROJECT_URL;
const projectKey = VITE_SUPABASE_PROJECT_KEY;

export const supabase = createClient(projectURL, projectKey);