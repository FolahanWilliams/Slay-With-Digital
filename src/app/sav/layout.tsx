import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sav — A non-judgemental third parent, in your pocket",
    description:
        "Join the Sav waitlist. A personalized parenting coach for the AI era — brought to you by Yetty Williams, founder of LagosMums.",
};

export default function SavLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-[#FBF7F2] text-neutral-900">{children}</div>;
}
