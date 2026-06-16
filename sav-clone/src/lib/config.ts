/**
 * Single source of truth for swappable Sav config.
 * Update these values (or set the matching env vars) and the whole site
 * updates — links in the header, hero, success state, footer, and SEO.
 */

/**
 * Accepts either a full WhatsApp link (https://wa.me/234… or chat.whatsapp.com/…)
 * or a bare phone number ("+234 801 234 5678", "2348012345678") and always
 * returns a tappable wa.me URL that opens a 1:1 chat with that number.
 */
function whatsappLink(value: string | undefined): string {
    const fallback = "https://wa.me/PLACEHOLDER";
    const trimmed = value?.trim();
    if (!trimmed) return fallback;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    const digits = trimmed.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : fallback;
}

export const config = {
    brand: {
        name: "Sav",
        tagline: "A non-judgemental third parent, in your pocket.",
        description:
            "Join the Sav waitlist. A personalized parenting coach for the AI era — brought to you by Yetty Williams, founder of LagosMums.",
    },
    // Public URL where this site is deployed (used for canonical + sitemap + OG).
    // Set NEXT_PUBLIC_SITE_URL in production to override.
    siteUrl:
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://sav-waitlist.vercel.app",
    // Post-signup WhatsApp link shown on the success state. Opens a direct
    // 1:1 chat with Yetty's number. Set NEXT_PUBLIC_WHATSAPP_URL to either a
    // full wa.me link or just the phone number — both work.
    whatsappUrl: whatsappLink(process.env.NEXT_PUBLIC_WHATSAPP_URL),
    // Prefilled into the WhatsApp chat so the conversation starts itself.
    // Set NEXT_PUBLIC_WHATSAPP_MESSAGE to override.
    whatsappMessage:
        process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
        "Hi Sav! I just joined the waitlist 💛",
    lagosMumsUrl: "https://lagosmums.com",
    yettyWilliamsUrl: "https://www.linkedin.com/in/yettywilliams",
    bookUrl: "https://digitalsavvyparenting.com/digital-savvy-parenting-book",
    founder: {
        name: "Yetty Williams",
        title: "Founder, LagosMums",
    },
} as const;

/**
 * The WhatsApp link with the prefilled message appended, so tapping it opens
 * a chat that's ready to send. Falls back to the bare link if there's no message.
 */
export function whatsappHref(): string {
    const base = config.whatsappUrl;
    if (!config.whatsappMessage) return base;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}text=${encodeURIComponent(config.whatsappMessage)}`;
}
