import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

dotenv.config();

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export { supabase, supabaseAdmin };
