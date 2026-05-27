/**
 * Single source of truth for swappable Sav config.
 * Update these values (or set the matching env vars) and the whole site
 * updates — links in the header, hero, success state, footer, and SEO.
 */

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
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://slay-with-digital.vercel.app",
    // Post-signup WhatsApp link shown on the success state.
    // Set NEXT_PUBLIC_WHATSAPP_URL to the real wa.me/<number> link.
    whatsappUrl:
        process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/PLACEHOLDER",
    lagosMumsUrl: "https://lagosmums.com",
    yettyWilliamsUrl: "https://yettywilliams.com",
    bookUrl: "https://selar.co",
    founder: {
        name: "Yetty Williams",
        title: "Founder, LagosMums",
    },
} as const;
