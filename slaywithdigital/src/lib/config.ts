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
        email: "yetty@SlaywithDigital.com",
        phone: "+44 7787 525 391",
    },

    social: {
        instagram: "https://instagram.com/slaywithdigital",
        linkedin: "https://www.linkedin.com/in/yettywilliams",
    },

    founder: {
        name: "Yetty Williams",
        photo: "/yetty-williams.jpg",
    },
} as const;

/** Companies Yetty has worked at or consulted with. Shown in the marquee. */
export const companies: string[] = [
    "Google",
    "Bloomberg",
    "JPMorgan",
    "Wachovia Bank (now Wells Fargo Bank UK)",
    "PwC",
    "Nestlé",
    "Procter & Gamble",
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
        quote: "I chose to continue our mentorship because I felt that you offered me the right support. I was so happy with what you offered me during our time together on the Help to Grow program. What I particularly like about your approach to mentoring is that you are incredibly supportive, and I love the personal touch you bring. I would absolutely recommend you to anybody who is looking to scale their business.",
        name: "Jemima, Help to Grow Program Participant",
    },
];

export const credentials: string[] = [
    "Forbes Over 30 Under 50",
    "MBA, Yale School of Management",
    "Strategic Digital Media Marketing, University of Cambridge",
    "Trained in cyberpsychology",
    "Accredited coach & mentor, EMCC",
    "Business mentor, Help to Grow (UK Gov)",
    "Advisory board, Good Future Foundation UK",
];
