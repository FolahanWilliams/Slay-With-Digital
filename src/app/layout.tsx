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
  title: "Sav — A non-judgemental third parent, in your pocket",
  description:
    "Join the Sav waitlist. A personalized parenting coach for the AI era — brought to you by Yetty Williams, founder of LagosMums.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans flex flex-col min-h-screen bg-[#FBF7F2] text-neutral-900`}>
        <ConditionalChrome navigation={<Navigation />} footer={<Footer />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
