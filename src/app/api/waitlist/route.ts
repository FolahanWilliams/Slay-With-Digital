import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { waitlistSchema, type WaitlistFormState } from "@/lib/waitlist";

// A stable endpoint (unlike a hashed Server Action ID) so submissions keep
// working across redeploys — no "Server Action not found" skew errors.
export async function POST(req: Request): Promise<NextResponse<WaitlistFormState>> {
    let payload: unknown;
    try {
        payload = await req.json();
    } catch {
        return NextResponse.json(
            { status: "error", message: "Invalid request." },
            { status: 400 },
        );
    }

    const data = (payload ?? {}) as Record<string, unknown>;

    // Honeypot: real users never fill this hidden field. Pretend success so
    // bots don't learn they've been filtered, but drop the signup.
    if (typeof data.website === "string" && data.website.trim().length > 0) {
        return NextResponse.json({ status: "success", message: "You're on the list." });
    }

    const parsed = waitlistSchema.safeParse({
        email: typeof data.email === "string" ? data.email : "",
        phone: typeof data.phone === "string" ? data.phone : "",
        childrenAges: Array.isArray(data.childrenAges)
            ? data.childrenAges.map(String)
            : [],
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
        return NextResponse.json(
            { status: "error", message: "Please check the form and try again.", fieldErrors },
            { status: 400 },
        );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        console.error("[sav waitlist] Supabase env vars are not set; dropping signup.");
        return NextResponse.json(
            { status: "error", message: "Something went wrong. Please try again." },
            { status: 500 },
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
            return NextResponse.json({ status: "success", message: "You're already on the list." });
        }
        console.error("[sav waitlist] insert failed:", error);
        return NextResponse.json(
            { status: "error", message: "Something went wrong. Please try again." },
            { status: 500 },
        );
    }

    return NextResponse.json({ status: "success", message: "You're on the list." });
}
