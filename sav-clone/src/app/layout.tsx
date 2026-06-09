import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { config } from "@/lib/config";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
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
        "parenting coach",
        "AI parenting",
        "screen time advice",
        "LagosMums",
        "Yetty Williams",
        "parenting WhatsApp",
        "digital parenting",
        "Sav",
    ],
    authors: [{ name: config.founder.name, url: config.lagosMumsUrl }],
    creator: config.founder.name,
    publisher: "LagosMums",
    category: "parenting",
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: config.siteUrl,
        siteName: config.brand.name,
        title: `${config.brand.name} — ${config.brand.tagline}`,
        description: config.brand.description,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: `${config.brand.name} — ${config.brand.tagline}`,
        description: config.brand.description,
        creator: "@LagosMums",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
};

export const viewport: Viewport = {
    themeColor: "#FBF7F2",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: config.brand.name,
        url: config.siteUrl,
        description: config.brand.description,
        publisher: {
            "@type": "Organization",
            name: "LagosMums",
            url: config.lagosMumsUrl,
            founder: { "@type": "Person", name: config.founder.name },
        },
        potentialAction: {
            "@type": "SubscribeAction",
            target: `${config.siteUrl}/#join`,
        },
    };

    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen bg-[#FBF7F2] text-neutral-900`}
            >
                <main className="flex-grow">{children}</main>
                <Analytics />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}
