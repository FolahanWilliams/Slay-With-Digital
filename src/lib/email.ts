import { Resend } from "resend";

import { config, whatsappHref } from "@/lib/config";

export type WaitlistEmailData = {
    email: string;
    phone: string | null;
    childrenAges: string[];
    referralSource: string | null;
};

// TODO (email setup, finishing tomorrow): create a Resend account, verify the
// sending domain, then set RESEND_API_KEY + EMAIL_FROM (+ optional
// WAITLIST_NOTIFY_TO) in the env. Until those are set this is a no-op, so
// signups keep working without email.

/**
 * Sends a welcome email to the new signup and (optionally) a notification to
 * the team, via Resend. Best-effort: returns silently if Resend isn't
 * configured, and the caller wraps this so a mail failure never fails a signup.
 */
export async function sendWaitlistEmails(data: WaitlistEmailData): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!apiKey || !from) return;

    const resend = new Resend(apiKey);
    const wa = whatsappHref();

    const tasks: Promise<unknown>[] = [
        resend.emails.send({
            from,
            to: data.email,
            subject: `You're on the ${config.brand.name} waitlist 💛`,
            text:
                `You're on the list.\n\n` +
                `Thanks for joining the ${config.brand.name} waitlist — a non-judgemental ` +
                `parenting coach for the AI era, from ${config.founder.name}.\n\n` +
                `As an early member you get direct WhatsApp access: ${wa}\n\n` +
                `We'll only email when ${config.brand.name} is ready for you.`,
            html:
                `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;color:#1c1917">` +
                `<h1 style="font-size:24px;margin:0 0 12px">You're on the list. 💛</h1>` +
                `<p style="line-height:1.6;color:#44403c">Thanks for joining the <strong>${config.brand.name}</strong> waitlist — ` +
                `a non-judgemental parenting coach for the AI era, from ${config.founder.name}.</p>` +
                `<p style="line-height:1.6;color:#44403c">As an early member you get direct WhatsApp access to help shape what ${config.brand.name} becomes:</p>` +
                `<p><a href="${wa}" style="display:inline-block;background:#171717;color:#fff;text-decoration:none;padding:12px 22px;border-radius:9999px;font-weight:500">Chat with us on WhatsApp</a></p>` +
                `<p style="line-height:1.6;color:#78716c;font-size:13px">We'll only email when ${config.brand.name} is ready for you.</p>` +
                `</div>`,
        }),
    ];

    const notifyTo = process.env.WAITLIST_NOTIFY_TO;
    if (notifyTo) {
        tasks.push(
            resend.emails.send({
                from,
                to: notifyTo,
                subject: `New ${config.brand.name} signup: ${data.email}`,
                text:
                    `Email: ${data.email}\n` +
                    `Phone: ${data.phone ?? "—"}\n` +
                    `Children's ages: ${data.childrenAges.join(", ") || "—"}\n` +
                    `Heard about us via: ${data.referralSource ?? "—"}`,
            }),
        );
    }

    await Promise.allSettled(tasks);
}
