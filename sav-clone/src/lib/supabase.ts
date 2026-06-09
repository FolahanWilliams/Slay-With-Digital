import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client, built from the service-role key. It bypasses
 * row-level security, so it must never be imported into client components.
 * Returns null when the env vars aren't set, letting callers degrade
 * gracefully (e.g. in local/preview builds without a database).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) return null;

    return createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
