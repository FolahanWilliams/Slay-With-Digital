import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Target, Layers, Rocket, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Grow Your Business With Digital. <span className="text-primary">Strategically.</span>
                </h1>
                <p className="max-w-[600px] text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  Expert digital media marketing consulting powered by the proven 7C&apos;s framework — helping businesses and brands scale with clarity, confidence, and strategy.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full bg-primary px-8 text-base font-medium hover:bg-primary/90">
                  <a href="mailto:yetty@yettywilliams.com">Book a Consultation</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base font-medium">
                  <Link href="/services">See Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[500px] lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000"
                alt="Professional woman in a modern workspace"
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="border-y border-border/50 bg-muted/30 py-10 mt-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center text-sm font-semibold tracking-wider text-muted-foreground sm:gap-12 md:text-base">
            <span>YALE SCHOOL OF MANAGEMENT MBA</span>
            <span>UNIVERSITY OF CAMBRIDGE</span>
            <span>FORMER GOOGLE BUSINESS MENTOR</span>
            <span>EMCC ACCREDITED COACH</span>
            <span>FEATURED IN THE GUARDIAN</span>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The Slay With Digital Advantage
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none bg-background shadow-none">
              <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-bold">Strategic Clarity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Align your business goals with a digital strategy that actually works. No guesswork.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-background shadow-none">
              <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Layers className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-bold">The 7C&apos;s Framework</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A proprietary methodology built from 15+ years of real-world digital marketing experience.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none bg-background shadow-none">
              <CardContent className="flex flex-col items-center space-y-4 text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Rocket className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-bold">Hands-On Implementation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Walk away with a content calendar, success metrics, and the tools to execute immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Client Success Stories
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                text: "My session with Mrs Yetty was very insightful and thought-provoking. I loved the practicality as she helped me gain clarity on a cloudy area. I'm particularly delighted with the roadmap to work with. She's so down-to-earth and so helpful.",
                author: "Ebuka",
                role: "Slay with Digital Masterclass Attendee"
              },
              {
                text: "I'd recommend LagosMums/Yetty if you need your business to stay relevant in this digital age. The webinar offered by far, great tools and methods to actually better position my business now.",
                author: "Masterclass Participant",
                role: ""
              },
              {
                text: "It is the most informative coaching session that I have attended in a long while. The presenters, including Yetty, were very practical and shared lots of personal experiences that we can all relate with.",
                author: "Workshop Attendee",
                role: ""
              }
            ].map((review, i) => (
              <Card key={i} className="flex flex-col justify-between">
                <CardContent className="p-8">
                  <div className="mb-6 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-foreground">{review.author}</p>
                    {review.role && <p className="text-sm text-muted-foreground">{review.role}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Slay With Digital Consulting",
            "description": "Digital media marketing consultancy and coaching practice founded by Yetty Williams, MBA.",
            "url": "https://slaywithdigital.vercel.app",
            "email": "yetty@yettywilliams.com",
            "founder": {
              "@type": "Person",
              "name": "Yetty Williams",
              "jobTitle": "Digital Media Marketing Consultant & Coach",
              "alumniOf": [
                { "@type": "CollegeOrUniversity", "name": "Yale School of Management" },
                { "@type": "CollegeOrUniversity", "name": "University of Pittsburgh" }
              ]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "GB"
            },
            "areaServed": ["GB", "NG", "Global"],
            "openingHours": "Mo-Fr 09:00-17:00",
            "sameAs": ["https://www.linkedin.com/in/yettywilliams/"]
          })
        }}
      />
    </>
  );
}
