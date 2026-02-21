import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Contact | Slay With Digital Consulting",
    description: "Get in touch with Slay With Digital Consulting. Book a digital coaching session or corporate consultation with Yetty Williams.",
};

export default function ContactPage() {
    return (
        <div className="bg-background py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-8">
                <div className="mx-auto max-w-4xl text-center mb-16">
                    <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Let&apos;s Work Together
                    </h1>
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                        Ready to scale your business with crystal-clear strategy? Get in touch to book a consultation, corporate training, or coaching session.
                    </p>
                </div>

                <div className="mb-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="flex flex-col items-center text-center p-6 border-none shadow-sm hover:shadow-md transition-shadow bg-muted/20">
                        <CardContent className="pt-6 flex flex-col items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg mb-1">Email</h3>
                                <Link href="mailto:yetty@yettywilliams.com" className="text-muted-foreground hover:text-primary transition-colors">
                                    yetty@yettywilliams.com
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center text-center p-6 border-none shadow-sm hover:shadow-md transition-shadow bg-muted/20">
                        <CardContent className="pt-6 flex flex-col items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg mb-1">Location</h3>
                                <p className="text-muted-foreground">London, United Kingdom</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center text-center p-6 border-none shadow-sm hover:shadow-md transition-shadow bg-muted/20">
                        <CardContent className="pt-6 flex flex-col items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg mb-1">Hours</h3>
                                <p className="text-muted-foreground">Monday – Friday<br />9:00 AM – 5:00 PM GMT</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col items-center text-center p-6 border-none shadow-sm hover:shadow-md transition-shadow bg-muted/20">
                        <CardContent className="pt-6 flex flex-col items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Linkedin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-lg mb-1">LinkedIn</h3>
                                <Link
                                    href="https://www.linkedin.com/in/yettywilliams/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    linkedin.com/in/yettywilliams
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-xl aspect-[21/9]">
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
    );
}
