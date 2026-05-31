"use client";

import Image from "next/image";
import { useState } from "react";
import {
    ArrowRight,
    ArrowLeft,
    Plus,
    X,
    Check,
    MessageCircle,
    Heart,
    Clock,
    Shield,
    Star,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { WaitlistFormState } from "@/lib/waitlist";

const initialState: WaitlistFormState = { status: "idle" };

export default function SavLandingPage() {
    const [joinOpen, setJoinOpen] = useState(false);
    const [joinKey, setJoinKey] = useState(0);

    const openJoin = () => {
        setJoinKey((k) => k + 1);
        setJoinOpen(true);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <TopBar onJoin={openJoin} />
            <Hero onJoin={openJoin} />
            <CredibilityBar />
            <Benefits />
            <MeetYetty />
            <Testimonials />
            <BookCallout />
            <ClosingCta onJoin={openJoin} />
            <SiteFooter />
            <WaitlistDialog key={joinKey} open={joinOpen} onOpenChange={setJoinOpen} />
        </div>
    );
}

function TopBar({ onJoin }: { onJoin: () => void }) {
    return (
        <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
            <span className="font-heading text-2xl tracking-tight text-neutral-900 md:text-3xl">
                Sav
            </span>
            <button
                type="button"
                onClick={onJoin}
                className="rounded-full bg-neutral-900 px-5 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 md:text-sm"
            >
                Join the waitlist
            </button>
        </header>
    );
}

function Hero({ onJoin }: { onJoin: () => void }) {
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

                    <button
                        type="button"
                        onClick={onJoin}
                        className="mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
                    >
                        Join the waitlist
                        <ArrowRight className="h-4 w-4" />
                    </button>

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

const REFERRAL_OPTIONS = [
    "Instagram",
    "LagosMums",
    "A friend or family",
    "Google search",
    "Facebook / X",
    "Other",
] as const;

const TOTAL_STEPS = 4;

function WaitlistDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [state, setState] = useState<WaitlistFormState>(initialState);
    const [pending, setPending] = useState(false);
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [childAges, setChildAges] = useState<string[]>([""]);
    const [referral, setReferral] = useState("");
    const [referralOther, setReferralOther] = useState("");
    const [website, setWebsite] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);

    const isSuccess = state.status === "success";

    const addChild = () => setChildAges((c) => (c.length >= 10 ? c : [...c, ""]));
    const removeChild = (idx: number) =>
        setChildAges((c) => (c.length === 1 ? c : c.filter((_, i) => i !== idx)));
    const updateChild = (idx: number, value: string) =>
        setChildAges((c) => c.map((v, i) => (i === idx ? value : v)));

    const validateEmail = () => {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        setEmailError(ok ? null : "Please enter a valid email.");
        return ok;
    };

    const submit = async () => {
        setPending(true);
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    phone,
                    childrenAges: childAges,
                    referralSource: referral === "Other" ? referralOther : referral,
                    website,
                }),
            });
            setState(await res.json());
        } catch {
            setState({ status: "error", message: "Something went wrong. Please try again." });
        } finally {
            setPending(false);
        }
    };

    const next = () => {
        if (pending) return;
        if (step === 0 && !validateEmail()) return;
        if (step === TOTAL_STEPS - 1) {
            void submit();
            return;
        }
        setStep((s) => s + 1);
    };
    const back = () => setStep((s) => Math.max(0, s - 1));

    const onKeyDown = (e: React.KeyboardEvent) => {
        const tag = (e.target as HTMLElement).tagName;
        if (e.key === "Enter" && tag !== "TEXTAREA") {
            e.preventDefault();
            if (!pending) next();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={!pending}
                aria-describedby={undefined}
                className="gap-0 overflow-hidden rounded-3xl border-neutral-200 bg-[#FBF7F2] p-0 sm:max-w-md"
            >
                {isSuccess ? (
                    <div className="px-8 py-10 text-center">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-7 w-7" />
                        </div>
                        <DialogTitle className="font-heading text-3xl tracking-tight text-neutral-900">
                            You&apos;re in.
                        </DialogTitle>
                        <p className="mx-auto mt-3 max-w-xs leading-relaxed text-neutral-600">
                            You&apos;re part of the first group. As a thank-you, message us
                            directly on WhatsApp to chat one-on-one and help shape what Sav becomes.
                        </p>
                        <a
                            href={config.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
                        >
                            <MessageCircle className="h-4 w-4" />
                            Chat with us on WhatsApp
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="h-1 w-full bg-neutral-200">
                            <div
                                className="h-full bg-amber-600 transition-all duration-300 ease-out"
                                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                            />
                        </div>
                        <div className="px-7 py-8" onKeyDown={onKeyDown}>
                            <DialogTitle className="sr-only">Join the Sav waitlist</DialogTitle>
                            <DialogDescription className="sr-only">
                                A few quick questions so we can tailor Sav for you.
                            </DialogDescription>
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                            />
                            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-700">
                                Step {step + 1} of {TOTAL_STEPS}
                            </p>

                            <div className="mt-4 min-h-[196px]">
                                {step === 0 && (
                                    <div>
                                        <h2 className="font-heading text-2xl tracking-tight text-neutral-900">
                                            What&apos;s your email?
                                        </h2>
                                        <p className="mt-1.5 text-sm text-neutral-500">
                                            We&apos;ll only email when Sav is ready for you.
                                        </p>
                                        <input
                                            type="email"
                                            inputMode="email"
                                            autoFocus
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (emailError) setEmailError(null);
                                            }}
                                            placeholder="you@email.com"
                                            className="mt-5 w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                        />
                                        {emailError && (
                                            <p className="mt-2 pl-1 text-sm text-red-600">
                                                {emailError}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {step === 1 && (
                                    <div>
                                        <h2 className="font-heading text-2xl tracking-tight text-neutral-900">
                                            Your phone number?
                                        </h2>
                                        <p className="mt-1.5 text-sm text-neutral-500">
                                            Optional — early members get WhatsApp access to chat with
                                            Yetty directly.
                                        </p>
                                        <input
                                            type="tel"
                                            inputMode="tel"
                                            autoFocus
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+234 801 234 5678"
                                            className="mt-5 w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h2 className="font-heading text-2xl tracking-tight text-neutral-900">
                                            How old are your children?
                                        </h2>
                                        <p className="mt-1.5 text-sm text-neutral-500">
                                            Optional — helps us tailor advice to their stage.
                                        </p>
                                        <div className="mt-5 space-y-2">
                                            {childAges.map((age, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="number"
                                                            inputMode="numeric"
                                                            min={0}
                                                            max={25}
                                                            autoFocus={idx === 0}
                                                            value={age}
                                                            onChange={(e) =>
                                                                updateChild(idx, e.target.value.replace(/\D/g, ""))
                                                            }
                                                            placeholder={`Child ${idx + 1}`}
                                                            className="w-full rounded-full border border-neutral-300 bg-white px-5 py-2.5 pr-12 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        />
                                                        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                                                            yrs
                                                        </span>
                                                    </div>
                                                    {childAges.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeChild(idx)}
                                                            aria-label="Remove child"
                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
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
                                                    className="inline-flex items-center gap-1.5 pl-2 pt-1 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    Add another child
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div>
                                        <h2 className="font-heading text-2xl tracking-tight text-neutral-900">
                                            How did you hear about Sav?
                                        </h2>
                                        <p className="mt-1.5 text-sm text-neutral-500">
                                            Optional — it helps us reach more parents like you.
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {REFERRAL_OPTIONS.map((opt) => (
                                                <button
                                                    type="button"
                                                    key={opt}
                                                    onClick={() => setReferral(opt)}
                                                    className={cn(
                                                        "rounded-full border px-4 py-2 text-sm transition-colors",
                                                        referral === opt
                                                            ? "border-amber-600 bg-amber-600 text-white"
                                                            : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900",
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {referral === "Other" && (
                                            <input
                                                type="text"
                                                autoFocus
                                                value={referralOther}
                                                onChange={(e) => setReferralOther(e.target.value)}
                                                placeholder="Where did you hear about us?"
                                                className="mt-3 w-full rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {state.status === "error" && state.message && (
                                <p className="mt-3 text-sm text-red-600">{state.message}</p>
                            )}

                            <div className="mt-7 flex items-center justify-between">
                                {step > 0 ? (
                                    <button
                                        type="button"
                                        onClick={back}
                                        disabled={pending}
                                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 disabled:opacity-50"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </button>
                                ) : (
                                    <span />
                                )}
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={pending}
                                    className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    {step === TOTAL_STEPS - 1
                                        ? pending
                                            ? "Joining…"
                                            : "Join the waitlist"
                                        : "Continue"}
                                    {!pending && <ArrowRight className="h-4 w-4" />}
                                </button>
                            </div>

                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={pending}
                                    className="mt-4 block w-full text-center text-xs text-neutral-400 transition-colors hover:text-neutral-600 disabled:opacity-50"
                                >
                                    {step === TOTAL_STEPS - 1 ? "Skip & join" : "Skip this question"}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
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
        "FORBES 30 UNDER 50",
        "EMCC ACCREDITED COACH",
        "FEATURED IN THE GUARDIAN",
    ];
    return (
        <section className="border-y-2 border-neutral-300 bg-white/60 py-8">
            <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                The wisdom behind Sav
            </p>
            <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
                    {[...items, ...items].map((label, i) => (
                        <div key={i} className="flex items-center" aria-hidden={i >= items.length}>
                            <span className="whitespace-nowrap text-xs font-semibold tracking-wider text-neutral-600 md:text-sm">
                                {label}
                            </span>
                            <span className="mx-8 h-1 w-1 shrink-0 rounded-full bg-amber-400/70" />
                        </div>
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
                        sizes="(min-width: 768px) 280px, 60vw"
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
                        href={config.bookUrl}
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
                        src="/yetty.jpg"
                        alt="Yetty Williams, founder of LagosMums"
                        fill
                        sizes="(min-width: 768px) 320px, 80vw"
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

function ClosingCta({ onJoin }: { onJoin: () => void }) {
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
                <button
                    type="button"
                    onClick={onJoin}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-neutral-900 transition-transform hover:scale-[1.02]"
                >
                    Join the waitlist
                    <ArrowRight className="h-4 w-4" />
                </button>
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
                    href={config.lagosMumsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline-offset-4 hover:underline"
                >
                    Yetty Williams
                </a>
                , founder of{" "}
                <a
                    href={config.lagosMumsUrl}
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

