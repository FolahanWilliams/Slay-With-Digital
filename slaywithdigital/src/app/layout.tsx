import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { config } from "@/lib/config";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    weight: ["500", "600", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(config.siteUrl),
    title: {
        default: `${config.brand.name} — ${config.brand.tagline}`,
        template: `%s · ${config.brand.name}`,
    },
    description: config.brand.description,
    keywords: [
        "digital media marketing",
        "digital marketing consultant",
        "social media strategy",
        "content strategy",
        "marketing consultancy",
        "Slay with Digital",
        "Yetty Williams",
        "grow your business online",
    ],
    authors: [{ name: config.founder.name, url: config.social.linkedin }],
    creator: config.founder.name,
    category: "business",
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: config.siteUrl,
        siteName: config.brand.name,
        title: `${config.brand.name} — ${config.brand.tagline}`,
        description: config.brand.description,
        locale: "en_GB",
    },
    twitter: {
        card: "summary_large_image",
        title: `${config.brand.name} — ${config.brand.tagline}`,
        description: config.brand.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
};

export const viewport: Viewport = {
    themeColor: "#0b0b0c",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: config.brand.name,
        url: config.siteUrl,
        description: config.brand.description,
        email: config.contact.email,
        telephone: config.contact.phone,
        areaServed: "Worldwide",
        founder: {
            "@type": "Person",
            name: config.founder.name,
            sameAs: config.social.linkedin,
        },
        sameAs: [config.social.linkedin],
    };

    return (
        <html lang="en">
            <head>
                <noscript>
                    <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
                </noscript>
            </head>
            <body
                className={`${inter.variable} ${sora.variable} font-sans antialiased bg-paper text-ink`}
            >
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}
