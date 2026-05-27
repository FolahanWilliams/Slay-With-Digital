"use client";

import Image from "next/image";
import { useActionState, useState, useTransition } from "react";
import { ArrowRight, Plus, X, MessageCircle, Heart, Clock, Shield, Star } from "lucide-react";
import { joinWaitlist, type WaitlistFormState } from "./actions";

const WHATSAPP_LINK = "https://wa.me/PLACEHOLDER"; // TODO: swap with real wa.me link
const LAGOSMUMS_LINK = "https://lagosmums.com";

const initialState: WaitlistFormState = { status: "idle" };

export default function SavLandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <TopBar />
            <Hero />
            <CredibilityBar />
            <Benefits />
            <MeetYetty />
            <Testimonials />
            <BookCallout />
            <ClosingCta />
            <SiteFooter />
        </div>
    );
}

function TopBar() {
    return (
        <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
            <span className="font-heading text-2xl tracking-tight text-neutral-900 md:text-3xl">
                Sav
            </span>
            <a
                href="#join"
                className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 md:text-sm"
            >
                Join the waitlist
            </a>
        </header>
    );
}

function Hero() {
    const [state, formAction] = useActionState(joinWaitlist, initialState);
    const [pending, startTransition] = useTransition();
    const [showOptional, setShowOptional] = useState(false);
    const [childAges, setChildAges] = useState<string[]>([""]);

    const onSubmit = (formData: FormData) => {
        startTransition(() => formAction(formData));
    };

    const addChild = () => setChildAges((c) => (c.length >= 10 ? c : [...c, ""]));
    const removeChild = (idx: number) =>
        setChildAges((c) => (c.length === 1 ? c : c.filter((_, i) => i !== idx)));
    const updateChild = (idx: number, value: string) =>
        setChildAges((c) => c.map((v, i) => (i === idx ? value : v)));

    if (state.status === "success") {
        return (
            <section id="join" className="px-6 py-20 md:px-12 md:py-28">
                <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
                    <SuccessState />
                    <PhoneMockup />
                </div>
            </section>
        );
    }

    return (
        <section id="join" className="px-6 pb-20 pt-4 md:px-12 md:pb-28 md:pt-8">
            <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-medium text-amber-900">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Now open — early waitlist
                    </div>
                    <h1 className="font-heading text-5xl leading-[1.02] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                        A third parent.
                        <br />
                        <span className="italic text-amber-700">In your pocket.</span>
                    </h1>
                    <p className="mt-7 max-w-md text-lg leading-relaxed text-neutral-700">
                        Sav is a non-judgemental parenting coach for the AI era. A wiser voice
                        whenever you need one — at 3am, on the school run, or mid-meltdown.
                    </p>

                    <form action={onSubmit} className="mt-10 space-y-5">
                        <div>
                            <div className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white pl-5 pr-1 py-1 shadow-sm focus-within:border-neutral-900">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@email.com"
                                    aria-label="Email address"
                                    className="flex-1 bg-transparent py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={pending}
                                    aria-label="Join the waitlist"
                                    className="flex h-11 items-center gap-1.5 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    Join
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            {state.fieldErrors?.email && (
                                <p className="mt-2 pl-5 text-sm text-red-600">
                                    {state.fieldErrors.email}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowOptional((v) => !v)}
                            className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
                        >
                            {showOptional ? "Hide optional questions" : "Tell us more (optional) →"}
                        </button>

                        {showOptional && (
                            <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white/60 p-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-neutral-900">
                                        How old are your children?
                                    </label>
                                    <div className="space-y-2">
                                        {childAges.map((age, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    name="childrenAges"
                                                    value={age}
                                                    onChange={(e) => updateChild(idx, e.target.value)}
                                                    placeholder={`Child ${idx + 1} — e.g. 4 years`}
                                                    className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-2 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                                />
                                                {childAges.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeChild(idx)}
                                                        aria-label="Remove child"
                                                        className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {childAges.length < 10 && (
                                            <button
                                                type="button"
                                                onClick={addChild}
                                                className="inline-flex items-center gap-1.5 pl-5 pt-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Add another child
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="aiConcern"
                                        className="mb-2 block text-sm font-medium text-neutral-900"
                                    >
                                        What&apos;s your biggest worry about AI and screen time?
                                    </label>
                                    <textarea
                                        id="aiConcern"
                                        name="aiConcern"
                                        rows={4}
                                        placeholder="No wrong answers. We&apos;re building this for you."
                                        className="w-full resize-none rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                    />
                                </div>
                            </div>
                        )}

                        {state.status === "error" && state.message && !state.fieldErrors?.email && (
                            <p className="text-sm text-red-600">{state.message}</p>
                        )}
                    </form>

                    <p className="mt-6 text-xs text-neutral-500">
                        No spam. We&apos;ll only email when Sav is ready for you.
                    </p>
                </div>

                <div className="relative">
                    <PhoneMockup />
                </div>
            </div>
        </section>
    );
}

function PhoneMockup() {
    return (
        <div className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-amber-100 via-rose-100 to-orange-100 blur-3xl opacity-70" />
            <div className="relative rounded-[2.5rem] border-[10px] border-neutral-900 bg-white shadow-2xl">
                <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
                <div className="overflow-hidden rounded-[1.75rem] bg-[#FBF7F2]">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-5 pb-3 pt-9">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-400 font-heading text-base font-bold text-white">
                                S
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-neutral-900">Sav</p>
                                <p className="text-[10px] text-emerald-600">● online</p>
                            </div>
                        </div>
                        <MessageCircle className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div className="space-y-3 px-4 py-5">
                        <Bubble side="user">
                            Toddler refusing to brush teeth again 😩 it&apos;s 9pm
                        </Bubble>
                        <Bubble side="sav">
                            Bedtime power struggles — classic. Two-year-olds need control, not
                            commands.
                        </Bubble>
                        <Bubble side="sav">
                            Try: <span className="font-medium">&ldquo;Blue brush or red brush?&rdquo;</span>{" "}
                            Choice = compliance. Want a 30-second song too? 🎵
                        </Bubble>
                        <Bubble side="user">trying it now…</Bubble>
                        <Bubble side="sav">I&apos;ll be here. You&apos;ve got this. 💛</Bubble>
                    </div>
                    <div className="border-t border-neutral-200 px-4 py-3">
                        <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2">
                            <span className="text-xs text-neutral-400">Type a message…</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Bubble({ side, children }: { side: "user" | "sav"; children: React.ReactNode }) {
    const isSav = side === "sav";
    return (
        <div className={`flex ${isSav ? "justify-start" : "justify-end"}`}>
            <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-snug ${
                    isSav
                        ? "bg-white text-neutral-800 shadow-sm"
                        : "bg-neutral-900 text-white"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

function CredibilityBar() {
    const items = [
        "YALE SCHOOL OF MANAGEMENT MBA",
        "UNIVERSITY OF CAMBRIDGE",
        "FORMER GOOGLE BUSINESS MENTOR",
        "EMCC ACCREDITED COACH",
        "FEATURED IN THE GUARDIAN",
    ];
    return (
        <section className="border-y border-neutral-200/70 bg-white/60 py-8">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                    The wisdom behind Sav
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-xs font-semibold tracking-wider text-neutral-600 md:text-sm">
                    {items.map((label) => (
                        <span key={label}>{label}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Benefits() {
    const items = [
        {
            icon: Clock,
            title: "There at 3am",
            body: "When your toddler won't sleep or your teen comes home upset, Sav is one tap away. No appointment, no waiting.",
        },
        {
            icon: Heart,
            title: "Zero judgement",
            body: "No “perfect parent” voice. Sav meets you where you are — the mess, the doubt, the tiny wins.",
        },
        {
            icon: Shield,
            title: "Built for the AI era",
            body: "Practical guidance on screens, chatbots, and online safety. Modern problems, grounded advice.",
        },
    ];

    return (
        <section className="bg-white px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-700">
                        What Sav helps with
                    </p>
                    <h2 className="font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-5xl">
                        Parenting is hard enough. The advice shouldn&apos;t be.
                    </h2>
                </div>
                <div className="grid gap-10 md:grid-cols-3">
                    {items.map(({ icon: Icon, title, body }) => (
                        <div key={title}>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold text-neutral-900">
                                {title}
                            </h3>
                            <p className="mt-3 leading-relaxed text-neutral-600">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    const reviews = [
        {
            text: "My session with Yetty was insightful and thought-provoking. She helped me gain clarity on a cloudy area. She's so down-to-earth and so helpful.",
            author: "Ebuka",
            role: "LagosMums community",
        },
        {
            text: "If you need to stay relevant in this digital age, Yetty's guidance is by far the best. Practical tools and methods I could use immediately.",
            author: "Workshop attendee",
            role: "Parent of two",
        },
        {
            text: "The most informative coaching I've attended in a long while. Yetty shares lots of personal experiences that every parent can relate to.",
            author: "Workshop attendee",
            role: "LagosMums member",
        },
    ];

    return (
        <section className="bg-stone-100/60 px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-14 max-w-2xl">
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-700">
                        Why parents trust Yetty
                    </p>
                    <h2 className="font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-5xl">
                        Backed by 15+ years of helping parents.
                    </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
                        >
                            <div className="mb-5 flex">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className="h-4 w-4 fill-amber-500 text-amber-500"
                                    />
                                ))}
                            </div>
                            <p className="mb-6 flex-1 leading-relaxed text-neutral-700">
                                &ldquo;{review.text}&rdquo;
                            </p>
                            <div>
                                <p className="font-semibold text-neutral-900">{review.author}</p>
                                <p className="text-sm text-neutral-500">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BookCallout() {
    return (
        <section className="px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-5xl items-center gap-12 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px]">
                    <Image
                        src="/bk.png"
                        alt="Digital Savvy Parenting book by Yetty Williams"
                        fill
                        className="object-contain drop-shadow-2xl transition-transform duration-500 hover:-translate-y-2"
                    />
                </div>
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                        Read while you wait
                    </div>
                    <h2 className="font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-4xl">
                        Digital Savvy Parenting
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-neutral-700">
                        Yetty&apos;s research-backed framework for raising responsible digital
                        citizens in today&apos;s fast-paced, screen-first world. The thinking
                        behind Sav, in book form.
                    </p>
                    <a
                        href="https://selar.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                        Get the book
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}

function MeetYetty() {
    return (
        <section className="px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_1.4fr]">
                <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl bg-neutral-100 shadow-lg">
                    <Image
                        src="https://lagosmums.com/wp-content/uploads/2019/10/Yetty-Williams-Google-LagosMums2019.jpg"
                        alt="Yetty Williams, founder of LagosMums"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-700">
                        Meet your guide
                    </p>
                    <h2 className="font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-4xl">
                        Built by Yetty Williams, founder of LagosMums.
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                        For 15+ years, Yetty has helped hundreds of thousands of parents through
                        LagosMums — Africa&apos;s largest parenting community. Sav is the
                        distilled version of that wisdom: available to you, on demand.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-500">
                        <span>📚 Author, Digital Savvy Parenting</span>
                        <span>🎓 Yale MBA</span>
                        <span>🎤 Former Google Business Mentor</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ClosingCta() {
    return (
        <section className="px-6 pb-24 pt-4 md:px-12">
            <div className="mx-auto max-w-3xl rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white md:px-12 md:py-20">
                <h2 className="font-heading text-3xl leading-tight tracking-tight md:text-5xl">
                    Be among the first to meet Sav.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-neutral-300 md:text-lg">
                    Early waitlist members get direct WhatsApp access to help shape what Sav
                    becomes.
                </p>
                <a
                    href="#join"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-neutral-900 transition-transform hover:scale-[1.02]"
                >
                    Join the waitlist
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}

function SiteFooter() {
    return (
        <footer className="border-t border-neutral-200/70 px-6 py-10 text-center md:px-12">
            <p className="text-sm text-neutral-500">
                Brought to you by{" "}
                <a
                    href={LAGOSMUMS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline-offset-4 hover:underline"
                >
                    Yetty Williams
                </a>
                , founder of{" "}
                <a
                    href={LAGOSMUMS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline-offset-4 hover:underline"
                >
                    LagosMums
                </a>
                .
            </p>
        </footer>
    );
}

function SuccessState() {
    return (
        <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-900">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                You&apos;re on the list
            </div>
            <h1 className="font-heading text-5xl leading-[1.02] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
                You&apos;re in.
                <br />
                <span className="italic text-amber-700">Welcome.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-neutral-700">
                You&apos;re part of the first group. As a thank-you, hop into our WhatsApp to
                chat with us directly and help shape what Sav becomes.
            </p>
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
                Chat with us on WhatsApp
                <ArrowRight className="h-4 w-4" />
            </a>
        </div>
    );
}
