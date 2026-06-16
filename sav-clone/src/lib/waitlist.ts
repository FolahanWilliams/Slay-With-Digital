import { z } from "zod";

export const waitlistSchema = z.object({
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
    digitalConcerns: z
        .array(z.string().trim())
        .max(20)
        .optional()
        .transform((arr) => arr?.filter((a) => a.length > 0) ?? []),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;

export type WaitlistFormState = {
    status: "idle" | "success" | "error";
    message?: string;
    fieldErrors?: Partial<
        Record<
            "email" | "phone" | "childrenAges" | "referralSource" | "digitalConcerns",
            string
        >
    >;
};
