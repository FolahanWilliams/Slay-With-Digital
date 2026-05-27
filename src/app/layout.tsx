import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

export const metadata: Metadata = {
  title: "Slay With Digital Consulting | Digital Media Marketing Strategy & Coaching",
  description: "Expert digital media marketing consulting by Yetty Williams, Yale MBA. Grow your business with the proven 7C's framework. Based in London, serving clients globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen bg-background text-foreground`}>
        <ConditionalChrome navigation={<Navigation />} footer={<Footer />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
