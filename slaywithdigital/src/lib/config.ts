/**
 * Single source of truth for Slay with Digital.
 * Swap copy, links, and lists here (or set the matching env vars) and the
 * whole site updates. Keep copy free of em dashes per the brand voice.
 */

export const config = {
    brand: {
        name: "Slay with Digital",
        // Short wordmark used in the logo lockup ("Slay with " + accent).
        accentWord: "Digital",
        tagline: "Use digital media to grow your business.",
        description:
            "Slay with Digital is a digital media marketing consultancy. We help business owners build a digital plan that turns followers into paying customers, without the overwhelm.",
    },

    // Public URL where this site is deployed (canonical + sitemap + OG).
    siteUrl:
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://slaywithdigital.com",

    // The main call to action points at a free audit quiz. Set
    // NEXT_PUBLIC_QUIZ_URL to override the hosted quiz link.
    quizUrl:
        process.env.NEXT_PUBLIC_QUIZ_URL ??
        "https://digitalsavvy.getformly.com/swdaudit",

    contact: {
        email: "yetty@yettywilliams.com",
        phone: "+44 7787 525 391",
    },

    social: {
        instagram: "https://instagram.com/slaywithdigital",
        linkedin: "https://www.linkedin.com/in/yettywilliams",
        lagosMums: "https://lagosmums.com",
    },

    founder: {
        name: "Yetty Williams",
        photo: "/yetty-williams.jpg",
    },
} as const;

/** Brands Slay with Digital has spoken to or consulted for. Shown in the marquee. */
export const companies: string[] = [
    "Google",
    "JPMorgan",
    "Visa",
    "PwC",
    "BBC Radio",
    "Lagos Business School",
    "MTN",
    "AXA Mansard",
    "Old Mutual",
    "Union Bank",
    "Sterling Bank",
    "BellaNaija",
];

/** The signature framework. The interactive grid renders these in order. */
export const sevenCs: { letter: string; title: string; copy: string }[] = [
    {
        letter: "1",
        title: "Calendar",
        copy: "Plan a quarterly content calendar so you always know what to post, and why.",
    },
    {
        letter: "2",
        title: "Creativity",
        copy: "Show up with content that is authentic to your brand and stops the scroll.",
    },
    {
        letter: "3",
        title: "Consistency",
        copy: "Turn up consistently so your audience comes to know, like, and trust you.",
    },
    {
        letter: "4",
        title: "Call to Action",
        copy: "Craft compelling calls to action that move people to take the next step.",
    },
    {
        letter: "5",
        title: "Convert",
        copy: "Turn your audience and followers into paying customers, not just likes.",
    },
    {
        letter: "6",
        title: "Captivate",
        copy: "Captivate your customers so they stay, return, and recommend you.",
    },
    {
        letter: "7",
        title: "Cross-sell",
        copy: "Cross-sell and upsell your other products and services to grow revenue.",
    },
];

export const services: { title: string; copy: string }[] = [
    {
        title: "Consulting",
        copy: "A bespoke digital media strategy for your business, built with you and ready to run.",
    },
    {
        title: "Training",
        copy: "Practical, hands-on training so your whole team can slay with digital.",
    },
    {
        title: "Coaching",
        copy: "One to one coaching to sharpen your digital presence and your confidence.",
    },
    {
        title: "Mentoring",
        copy: "Ongoing guidance that keeps your strategy on track as your business grows.",
    },
];

export const outcomes: string[] = [
    "A clear digital strategy",
    "A quarterly content calendar",
    "A system that converts followers to customers",
    "Confidence, without the overwhelm",
];

export const testimonials: { quote: string; name: string }[] = [
    {
        quote: "An all-around amazing and helpful presentation. Of all the sessions I have joined, this offered by far the best tools and methods to actually better position my business.",
        name: "Managing Director, Financial Services Company, Ethiopia",
    },
    {
        quote: "Very insightful and thought-provoking. I loved the practicality. She helped me gain clarity on a cloudy area and gave me a roadmap to work with. I would recommend her if you need your business to stay relevant in this digital age.",
        name: "Funke Giwa",
    },
    {
        quote: "Your session was electrifying and fascinating. Thank you so much for that. The institute appreciates you.",
        name: "Family Systems Engineering Institute",
    },
];

export const credentials: string[] = [
    "Forbes Over 50 honoree",
    "Yale MBA, Finance & Strategy",
    "Cambridge, Strategic Digital Media Marketing",
    "Accredited Coach, EMCC",
    "Author, Digital Savvy Parenting",
];
