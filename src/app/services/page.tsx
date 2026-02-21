import type { Metadata } from "next";
import Link from "next/link";
import { Zap, CalendarRange, Building2, Mic, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Services | Slay With Digital Consulting",
    description: "Digital coaching sessions, one-month marketing programmes, corporate consulting, speaking engagements, and life coaching from an award-winning digital strategist.",
};

const services = [
    {
        title: "Business Deep Dive (90-Minute Digital Coaching Session)",
        icon: Zap,
        description: "A focused 90-minute session designed for businesses with a basic digital presence that want to optimise for growth. We cover business strategy alignment, customer identification, content creation using the 7C's framework, and a one-month content calendar with success metrics. Can be split into 2 sessions. Contact us to book."
    },
    {
        title: "One-Month Digital Media Marketing Coaching",
        icon: CalendarRange,
        description: "A comprehensive one-month coaching programme that includes a 30-minute business strategy deep dive, four one-on-one coaching sessions, and a wrap-up session. You'll build a 12-month content calendar, create a content marketing automation funnel, set success metrics, and acquire the tools to implement your digital goals. Optional strategy call with your team. Contact us to book."
    },
    {
        title: "Digital Media Consulting for Brands & Corporates",
        icon: Building2,
        description: "Bespoke digital media marketing strategy for SMEs and multinational brands. We've partnered with Procter & Gamble, Nestlé, Friesland Campina, Nivea, MTN, and leading educational institutions. From campaign strategy to full digital transformation — we help you scale with purpose. Contact us for a proposal."
    },
    {
        title: "Speaking & Corporate Training",
        icon: Mic,
        description: "Engaging keynote presentations and corporate workshops on digital marketing strategy, work-life balance, digital citizenship, and leveraging technology for business growth. Perfect for conferences, company retreats, and professional development days. Contact us to discuss your event."
    },
    {
        title: "Life & Executive Coaching",
        icon: Compass,
        description: "Certified life coaching and executive coaching for professionals who want to live intentionally, lead effectively, and achieve clarity. Drawing on Neuro-Linguistic Programming, Cognitive Behavioural Therapy, and EMCC-accredited coaching methodologies. Book a discovery call."
    },
    {
        title: "Digital Parenting Coaching & Workshops",
        icon: ShieldCheck,
        description: "Expert coaching for parents, schools, and organisations navigating the digital world. Author of 'Digital Savvy Parenting: What the World Urgently Needs' — a research-backed framework for raising responsible digital citizens. Available for individual coaching, school workshops, and conference speaking."
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-background py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-16 max-w-3xl">
                    <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Our Services
                    </h1>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Bespoke coaching and consulting services designed to help you and your business scale with purpose. Driven by the proprietary 7C&apos;s framework and over 15 years of industry experience.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card key={index} className="flex flex-col justify-between border-border/40 shadow-sm transition-shadow hover:shadow-md">
                                <CardHeader>
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="font-heading text-xl leading-tight">
                                        {service.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="pt-6">
                                    <Button asChild variant="ghost" className="group p-0 font-bold hover:bg-transparent hover:text-primary">
                                        <Link href="/contact" className="flex items-center">
                                            Contact us to book
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
