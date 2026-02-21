import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "About Yetty Williams | Slay With Digital Consulting",
    description: "Yale MBA, Cambridge-trained strategist, EMCC-accredited coach, and founder of LagosMums. 15+ years helping businesses scale with digital media marketing.",
};

export default function AboutPage() {
    return (
        <div className="bg-background py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">

                {/* Business Story */}
                <div className="mb-24 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
                        <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                        <Image
                            src="https://lagosmums.com/wp-content/uploads/2019/10/Yetty-Williams-Google-LagosMums2019.jpg"
                            alt="Yetty Williams - Founder"
                            fill
                            className="rounded-3xl object-cover shadow-2xl origin-top"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl mb-8">
                            About Slay With Digital
                        </h1>
                        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                            <p>
                                Slay With Digital Consulting was founded by Yetty Williams — a Yale School of Management MBA graduate, University of Cambridge-trained digital strategist, EMCC-accredited coach, and certified NLP practitioner. With over 15 years of experience spanning financial services, oil & gas, real estate, and digital marketing, Yetty has helped hundreds of businesses and individuals harness the power of digital media to grow, scale, and thrive.
                            </p>
                            <p>
                                As the founder of LagosMums — Nigeria&apos;s premier parenting platform with over 1.5 million followers — Yetty built a brand from scratch using digital media, turning passion into purpose and purpose into profit. Through Slay With Digital, she now brings that same battle-tested expertise to businesses worldwide using her proprietary 7C&apos;s framework.
                            </p>
                            <p>
                                Recognised as one of Eko Women 100 by the Lagos State Governor (2022 & 2023), listed in YNaija Media 100 (2020), winner of the ELOY Award for Social Media/Online Editor, a former Google Business Mentor, and a Forbes BLK member — Yetty&apos;s work sits at the intersection of strategy, storytelling, and digital transformation.
                            </p>
                            <p>
                                Her latest book, <span className="font-medium italic text-foreground">Digital Savvy Parenting: What the World Urgently Needs</span>, extends her mission to help families navigate the digital age with confidence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mb-24 rounded-3xl bg-muted/40 p-8 md:p-16">
                    <div className="mb-12 text-center max-w-2xl mx-auto">
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-4">
                            Why Choose Us?
                        </h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                title: "Proven Track Record",
                                desc: "Worked with global brands including Procter & Gamble, Nestlé, Nivea, MTN, and top-tier educational institutions across Africa and the UK."
                            },
                            {
                                title: "Proprietary 7C's Framework",
                                desc: "A structured, repeatable methodology for digital media marketing — not generic advice, but a clear roadmap tailored to your business."
                            },
                            {
                                title: "World-Class Credentials",
                                desc: "Yale MBA, Cambridge executive education, EMCC-accredited coaching, NLP certification, and over a decade of hands-on digital marketing experience."
                            }
                        ].map((prop, i) => (
                            <div key={i} className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 shrink-0 text-primary mt-1" />
                                <div>
                                    <h3 className="mb-2 font-heading text-xl font-bold text-foreground">{prop.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{prop.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location / Google Map */}
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl mb-8">
                        Global Expertise. Based in London.
                    </h2>
                    <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-lg">
                        <iframe
                            src="https://maps.google.com/maps?q=London,+United+Kingdom&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
