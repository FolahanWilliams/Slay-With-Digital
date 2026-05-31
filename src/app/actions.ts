"use server";

import { z } from "zod";

import { getSupabaseAdmin } from "@/lib/supabase";

const waitlistSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email."),
    phone: z
        .string()
        .trim()
        .max(30)
        .optional()
        .transform((s) => (s && s.length > 0 ? s : null)),
    childrenAges: z
        .array(z.string().trim())
        .max(10)
        .optional()
        .transform((arr) => arr?.filter((a) => a.length > 0) ?? []),
    referralSource: z
        .string()
        .trim()
        .max(200)
        .optional()
        .transform((s) => (s && s.length > 0 ? s : null)),
});

export type WaitlistFormState = {
    status: "idle" | "success" | "error";
    message?: string;
    fieldErrors?: Partial<Record<"email" | "phone" | "childrenAges" | "referralSource", string>>;
};

export async function joinWaitlist(
    _prev: WaitlistFormState,
    formData: FormData,
): Promise<WaitlistFormState> {
    const raw = {
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        childrenAges: formData.getAll("childrenAges").map(String),
        referralSource: String(formData.get("referralSource") ?? ""),
    };

    const parsed = waitlistSchema.safeParse(raw);
    if (!parsed.success) {
        const fieldErrors: WaitlistFormState["fieldErrors"] = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as keyof NonNullable<WaitlistFormState["fieldErrors"]>;
            if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
        }
        return {
            status: "error",
            message: "Please check the form and try again.",
            fieldErrors,
        };
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        console.error("[sav waitlist] Supabase env vars are not set; dropping signup.");
        return { status: "error", message: "Something went wrong. Please try again." };
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
            return { status: "success", message: "You're already on the list." };
        }
        console.error("[sav waitlist] insert failed:", error);
        return { status: "error", message: "Something went wrong. Please try again." };
    }

    return {
        status: "success",
        message: "You're on the list.",
    };
}
