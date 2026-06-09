import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const ALLOWED_EVENTS = new Set([
    "page_view",
    "modal_opened",
    "step_completed",
    "signup_completed",
]);

// Analytics is best-effort and must never disrupt the client, so every path
// returns 204 — we just decline to store anything we don't like.
function noContent() {
    return new NextResponse(null, { status: 204 });
}

export async function POST(req: Request) {
    if (req.headers.get("content-type")?.includes("application/json") !== true) {
        return noContent();
    }

    let payload: unknown;
    try {
        payload = await req.json();
    } catch {
        return noContent();
    }

    const data = (payload ?? {}) as Record<string, unknown>;
    const event = typeof data.event === "string" ? data.event : "";
    if (!ALLOWED_EVENTS.has(event)) return noContent();

    const supabase = getSupabaseAdmin();
    if (!supabase) return noContent();

    const ip = clientIp(req);
    const allowed = await rateLimit(supabase, `track:${ip}`, 240, 3600);
    if (!allowed) return noContent();

    const step =
        typeof data.step === "number" && Number.isInteger(data.step) ? data.step : null;
    const sessionId =
        typeof data.sessionId === "string" ? data.sessionId.slice(0, 64) : null;
    const referral =
        typeof data.referral === "string" && data.referral.length > 0
            ? { referral: data.referral.slice(0, 200) }
            : null;

    await supabase.from("sav_events").insert({
        event,
        step,
        session_id: sessionId,
        meta: referral,
    });

    return noContent();
}
