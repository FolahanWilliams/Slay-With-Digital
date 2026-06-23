import Image from "next/image";
import {
    ArrowRight,
    Check,
    Compass,
    Users,
    MessageCircle,
    Route,
    Star,
    TrendingUp,
    CalendarCheck,
    UserPlus,
} from "lucide-react";
import {
    config,
    companies,
    services,
    outcomes,
    testimonials,
    credentials,
} from "@/lib/config";
import { Nav } from "@/components/site/nav";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { SevenCs } from "@/components/site/seven-cs";

const serviceIcons = [Compass, Users, MessageCircle, Route];

export default function Home() {
    return (
        <div id="top">
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <Problem />
                <Program />
                <Services />
                <Results />
                <Testimonials />
                <About />
                <FinalCta />
            </main>
            <Footer />
        </div>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 right-[-10%] size-[34rem] rounded-full bg-brand-soft blur-3xl"
            />
            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                    <Reveal>
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                            <span className="size-1.5 rounded-full bg-brand" />
                            Digital media marketing consultancy
                        </span>
                    </Reveal>
                    <Reveal delay={60}>
                        <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                            Use digital media to{" "}
                            <span className="text-brand">grow your business</span>.
                        </h1>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                            If you are not online, you are not in business. Slay with
                            Digital gives you a clear plan to show up, stand out, and
                            turn followers into paying customers. All without the
                            overwhelm.
                        </p>
                    </Reveal>
                    <Reveal delay={180}>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href={config.quizUrl}
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
                            >
                                Take the free 2-minute audit
                                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#program"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink/30"
                            >
                                Explore the 7 C&apos;s
                            </a>
                        </div>
                    </Reveal>
                    <Reveal delay={240}>
                        <p className="mt-8 text-sm text-muted">
                            Strategy shaped alongside teams at{" "}
                            <span className="font-semibold text-ink">Google</span>,{" "}
                            <span className="font-semibold text-ink">JPMorgan</span>,{" "}
                            <span className="font-semibold text-ink">PwC</span> and{" "}
                            <span className="font-semibold text-ink">MTN</span>.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={160}>
                    <HeroVisual />
                </Reveal>
            </div>
        </section>
    );
}

function HeroVisual() {
    const bars = [38, 46, 42, 58, 64, 76, 92];
    return (
        <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-line bg-paper p-6 shadow-xl shadow-ink/5 sm:p-7">
                <div className="flex items-center justify-between">
                    <Logo />
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
                        <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                        Live
                    </span>
                </div>

                <p className="mt-6 text-sm font-medium text-muted">Growth snapshot</p>
                <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
                        +186%
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                        <TrendingUp className="size-4" />
                        engagement
                    </span>
                </div>

                <div className="mt-5 flex h-28 items-end justify-between gap-2">
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            className={
                                i === bars.length - 1
                                    ? "w-full rounded-md bg-brand"
                                    : "w-full rounded-md bg-ink/10"
                            }
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>

                <div className="mt-6 space-y-2.5">
                    <StatRow label="Followers to customers" value="1 in 5" />
                    <StatRow label="Posting consistency" value="On plan" />
                </div>
            </div>

            <div className="absolute -right-3 -top-4 hidden rounded-2xl border border-line bg-paper px-3.5 py-2.5 shadow-lg sm:flex sm:items-center sm:gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-brand-soft text-brand">
                    <CalendarCheck className="size-4" />
                </span>
                <span className="text-xs font-semibold text-ink">
                    Quarterly calendar
                </span>
            </div>
            <div className="absolute -bottom-4 -left-3 hidden rounded-2xl border border-line bg-paper px-3.5 py-2.5 shadow-lg sm:flex sm:items-center sm:gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-brand text-white">
                    <UserPlus className="size-4" />
                </span>
                <span className="text-xs font-semibold text-ink">New customer</span>
            </div>
        </div>
    );
}

function StatRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-cream px-3.5 py-2.5">
            <span className="text-sm text-muted">{label}</span>
            <span className="font-display text-sm font-bold text-ink">{value}</span>
        </div>
    );
}

function Marquee() {
    const row = [...companies, ...companies];
    return (
        <section className="border-y border-line bg-cream py-7">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Spoken to &amp; consulted for
            </p>
            <div className="group/marquee relative overflow-hidden">
                <div className="flex w-max animate-marquee items-center gap-12 pr-12">
                    {row.map((name, i) => (
                        <span
                            key={i}
                            className="whitespace-nowrap font-display text-lg font-bold text-ink/40"
                        >
                            {name}
                        </span>
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
            </div>
        </section>
    );
}

function Problem() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
                <Reveal>
                    <SectionEyebrow>The reality</SectionEyebrow>
                </Reveal>
                <Reveal delay={60}>
                    <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                        If you are not online, you are not in business.
                    </h2>
                </Reveal>
                <Reveal delay={120}>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                        Buyer behaviour has changed. Most people start their purchase
                        decisions online. So how well are you positioned? How are you
                        using digital media to grow your business, reach and serve your
                        customers?
                    </p>
                </Reveal>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 px-5 sm:grid-cols-3 sm:px-8">
                {[
                    {
                        title: "No clear strategy",
                        copy: "Posting when you remember, with no plan tying it to growth.",
                    },
                    {
                        title: "Inconsistent presence",
                        copy: "Showing up in bursts, so your audience never builds trust.",
                    },
                    {
                        title: "Followers that do not convert",
                        copy: "Plenty of likes, but few of them ever become customers.",
                    },
                ].map((p, i) => (
                    <Reveal key={p.title} delay={i * 80} className="h-full">
                        <div className="h-full rounded-2xl border border-line bg-paper p-6">
                            <span className="font-display text-sm font-bold text-brand">
                                0{i + 1}
                            </span>
                            <h3 className="mt-2 font-display text-lg font-bold text-ink">
                                {p.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                                {p.copy}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function Program() {
    return (
        <section id="program" className="scroll-mt-20 bg-cream py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="max-w-2xl">
                    <Reveal>
                        <SectionEyebrow>The framework</SectionEyebrow>
                    </Reveal>
                    <Reveal delay={60}>
                        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                            The 7 C&apos;s Digital Media Marketing Program
                        </h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="mt-5 text-lg leading-relaxed text-muted">
                            A simple, repeatable system to plan, create, and convert,
                            built around seven C&apos;s and tailored to a brand that is
                            unique and authentic to you.
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={120} className="mt-12">
                    <SevenCs />
                </Reveal>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section id="services" className="scroll-mt-20 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="max-w-2xl">
                    <Reveal>
                        <SectionEyebrow>How we work together</SectionEyebrow>
                    </Reveal>
                    <Reveal delay={60}>
                        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                            Ways to slay with digital
                        </h2>
                    </Reveal>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {services.map((s, i) => {
                        const Icon = serviceIcons[i] ?? Compass;
                        return (
                            <Reveal key={s.title} delay={i * 70} className="h-full">
                                <div className="group h-full rounded-2xl border border-line bg-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-ink/5">
                                    <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                        <Icon className="size-6" />
                                    </span>
                                    <h3 className="mt-5 font-display text-xl font-bold text-ink">
                                        {s.title}
                                    </h3>
                                    <p className="mt-2 leading-relaxed text-muted">
                                        {s.copy}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function Results() {
    return (
        <section id="results" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
                <div>
                    <Reveal>
                        <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">
                            The outcome
                        </span>
                    </Reveal>
                    <Reveal delay={60}>
                        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                            How can you slay with digital?
                        </h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="mt-5 text-lg leading-relaxed text-white/70">
                            You need an online strategy, and the skills to implement and
                            measure success. Slay with Digital walks you through a unique
                            7 C&apos;s plan to succeed online, convert your followers to
                            paying customers, and grow exponentially. All without
                            overwhelm.
                        </p>
                    </Reveal>
                </div>

                <ul className="grid gap-3">
                    {outcomes.map((o, i) => (
                        <Reveal as="li" key={o} delay={i * 70}>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                                    <Check className="size-4" />
                                </span>
                                <span className="font-display text-lg font-semibold">
                                    {o}
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                        What clients say
                    </h2>
                </Reveal>
                <div className="mt-12 grid gap-5 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name} delay={i * 80} className="h-full">
                            <figure className="flex h-full flex-col rounded-2xl border border-line bg-cream p-7">
                                <div className="flex gap-0.5 text-brand">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            className="size-4 fill-current"
                                        />
                                    ))}
                                </div>
                                <blockquote className="mt-4 flex-grow text-[15px] leading-relaxed text-ink/80">
                                    {t.quote}
                                </blockquote>
                                <figcaption className="mt-5 font-display text-sm font-bold text-ink">
                                    {t.name}
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about" className="scroll-mt-20 bg-cream py-20 sm:py-28">
            <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
                <Reveal>
                    <div className="relative mx-auto w-full max-w-xs">
                        <div
                            aria-hidden
                            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl bg-brand/15"
                        />
                        <Image
                            src={config.founder.photo}
                            alt={config.founder.name}
                            width={560}
                            height={666}
                            className="w-full rounded-3xl border border-line object-cover"
                        />
                    </div>
                </Reveal>

                <div>
                    <Reveal>
                        <SectionEyebrow>Behind the brand</SectionEyebrow>
                    </Reveal>
                    <Reveal delay={60}>
                        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                            Led by Yetty Williams
                        </h2>
                    </Reveal>
                    <Reveal delay={120}>
                        <p className="mt-5 text-lg leading-relaxed text-muted">
                            Slay with Digital is led by Yetty Williams, founder of
                            LagosMums and a digital media strategist with over 20 years
                            of internationally relevant experience growing brands and
                            audiences online. She has spoken and consulted for Google,
                            JPMorgan, PwC, Lagos Business School and more.
                        </p>
                    </Reveal>
                    <Reveal delay={180}>
                        <ul className="mt-6 flex flex-wrap gap-2.5">
                            {credentials.map((c) => (
                                <li
                                    key={c}
                                    className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium text-ink"
                                >
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function FinalCta() {
    return (
        <section className="px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center sm:px-12 sm:py-20">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -left-10 -top-10 size-48 rounded-full bg-white/10"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-12 -right-8 size-56 rounded-full bg-black/10"
                    />
                    <div className="relative">
                        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                            Get your free Digital Media Marketing audit.
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
                            Take the 2-minute quiz for a snapshot of where your business
                            stands online, and exactly what to fix first.
                        </p>
                        <a
                            href={config.quizUrl}
                            className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-brand shadow-lg transition-transform hover:-translate-y-0.5"
                        >
                            Start the free audit
                            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-line bg-paper">
            <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-sm">
                        <Logo />
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                            {config.brand.tagline} A digital media marketing consultancy
                            helping business owners turn followers into customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-10 sm:gap-16">
                        <div>
                            <p className="font-display text-sm font-bold text-ink">
                                Explore
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm text-muted">
                                <li>
                                    <a className="hover:text-brand" href="#program">
                                        The 7 C&apos;s
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-brand" href="#services">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-brand" href="#about">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-brand" href={config.quizUrl}>
                                        Free audit
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-display text-sm font-bold text-ink">
                                Connect
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm text-muted">
                                <li>
                                    <a
                                        className="hover:text-brand"
                                        href={`mailto:${config.contact.email}`}
                                    >
                                        {config.contact.email}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="hover:text-brand"
                                        href={config.social.instagram}
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="hover:text-brand"
                                        href={config.social.linkedin}
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="hover:text-brand"
                                        href={config.social.lagosMums}
                                    >
                                        LagosMums
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {config.brand.name}. All rights
                        reserved.
                    </p>
                    <p>Use digital media to grow your business.</p>
                </div>
            </div>
        </footer>
    );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">
            {children}
        </span>
    );
}
