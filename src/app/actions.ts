"use server";

import { z } from "zod";

const waitlistSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email."),
    childrenAges: z
        .array(z.string().trim())
        .max(10)
        .optional()
        .transform((arr) => arr?.filter((a) => a.length > 0) ?? []),
    aiConcern: z
        .string()
        .trim()
        .max(2000)
        .optional()
        .transform((s) => (s && s.length > 0 ? s : null)),
});

export type WaitlistFormState = {
    status: "idle" | "success" | "error";
    message?: string;
    fieldErrors?: Partial<Record<"email" | "childrenAges" | "aiConcern", string>>;
};

export async function joinWaitlist(
    _prev: WaitlistFormState,
    formData: FormData,
): Promise<WaitlistFormState> {
    const raw = {
        email: String(formData.get("email") ?? ""),
        childrenAges: formData.getAll("childrenAges").map(String),
        aiConcern: String(formData.get("aiConcern") ?? ""),
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

    // ─── Supabase hookup goes here ───────────────────────────────────────
    // To wire this up later, install `@supabase/supabase-js`, set
    // SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY env vars, run the SQL in
    // supabase/sav_waitlist.sql, then replace this block with:
    //
    //   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    //   const { error } = await supabase.from("sav_waitlist").insert({
    //     email: parsed.data.email,
    //     children_ages: parsed.data.childrenAges,
    //     ai_concern: parsed.data.aiConcern,
    //   });
    //   if (error) return { status: "error", message: "Something went wrong. Please try again." };
    // ─────────────────────────────────────────────────────────────────────
    console.log("[sav waitlist]", parsed.data);

    return {
        status: "success",
        message: "You're on the list.",
    };
}
