"use client"

import { createClient } from "@supabase/supabase-js";
// Read both public and non-public env var names for robustness
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn early with actionable guidance
  console.error(
    "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (or SUPABASE_URL / SUPABASE_ANON_KEY)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);