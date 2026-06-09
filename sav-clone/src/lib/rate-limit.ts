import type { SupabaseClient } from "@supabase/supabase-js";

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(req: Request): string {
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0]!.trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Postgres-backed fixed-window rate limiter (see the `check_rate_limit`
 * function in supabase/migrations). Returns true if the request is allowed.
 * Fails open — if the limiter errors we never block a real user.
 */
export async function rateLimit(
    supabase: SupabaseClient,
    key: string,
    max: number,
    windowSeconds: number,
): Promise<boolean> {
    const { data, error } = await supabase.rpc("check_rate_limit", {
        p_key: key,
        p_max: max,
        p_window_seconds: windowSeconds,
    });
    if (error) return true;
    return data !== false;
}
