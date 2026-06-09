import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { waitlistSchema, type WaitlistFormState } from "@/lib/waitlist";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendWaitlistEmails } from "@/lib/email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;

// A stable endpoint (unlike a hashed Server Action ID) so submissions keep
// working across redeploys — no "Server Action not found" skew errors.
function json(state: WaitlistFormState, status = 200) {
    return NextResponse.json(state, { status });
}

export async function POST(req: Request): Promise<NextResponse<WaitlistFormState>> {
    if (!req.headers.get("content-type")?.includes("application/json")) {
        return json({ status: "error", message: "Invalid request." }, 415);
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
        return json({ status: "error", message: "Request too large." }, 413);
    }

    let payload: unknown;
    try {
        payload = JSON.parse(raw);
    } catch {
        return json({ status: "error", message: "Invalid request." }, 400);
    }

    const data = (payload ?? {}) as Record<string, unknown>;

    // Honeypot: real users never fill this hidden field. Pretend success so
    // bots don't learn they've been filtered, but drop the signup.
    if (typeof data.website === "string" && data.website.trim().length > 0) {
        return json({ status: "success", message: "You're on the list." });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        console.error("[sav waitlist] Supabase env vars are not set; dropping signup.");
        return json({ status: "error", message: "Something went wrong. Please try again." }, 500);
    }

    // Abuse hardening: cap signups per IP per hour. Fails open on limiter error.
    const ip = clientIp(req);
    const allowed = await rateLimit(supabase, `signup:${ip}`, 8, 3600);
    if (!allowed) {
        return json(
            { status: "error", message: "Too many attempts. Please try again later." },
            429,
        );
    }

    const parsed = waitlistSchema.safeParse({
        email: typeof data.email === "string" ? data.email : "",
        phone: typeof data.phone === "string" ? data.phone : "",
        childrenAges: Array.isArray(data.childrenAges) ? data.childrenAges.map(String) : [],
        referralSource:
            typeof data.referralSource === "string" ? data.referralSource : "",
    });

    if (!parsed.success) {
        const fieldErrors: WaitlistFormState["fieldErrors"] = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as keyof NonNullable<
                WaitlistFormState["fieldErrors"]
            >;
            if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
        }
        return json(
            { status: "error", message: "Please check the form and try again.", fieldErrors },
            400,
        );
    }

    const { error } = await supabase.from("sav_waitlist").insert({
        email: parsed.data.email,
        phone: parsed.data.phone,
        children_ages: parsed.data.childrenAges,
        referral_source: parsed.data.referralSource,
    });

    if (error) {
        // 23505 = unique_violation: this email already joined. Treat as success
        // so we don't leak who's on the list or punish a double-submit.
        if (error.code === "23505") {
            return json({ status: "success", message: "You're already on the list." });
        }
        console.error("[sav waitlist] insert failed:", error);
        return json({ status: "error", message: "Something went wrong. Please try again." }, 500);
    }

    // Best-effort welcome + notification email. Never fail the signup over email.
    try {
        await sendWaitlistEmails({
            email: parsed.data.email,
            phone: parsed.data.phone,
            childrenAges: parsed.data.childrenAges,
            referralSource: parsed.data.referralSource,
        });
    } catch (e) {
        console.error("[sav waitlist] email send failed:", e);
    }

    return json({ status: "success", message: "You're on the list." });
}
