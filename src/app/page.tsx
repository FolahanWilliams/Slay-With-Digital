"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    Plus,
    X,
    Check,
    MessageCircle,
    Heart,
    Clock,
    Shield,
    Star,
    Sparkles,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import type { WaitlistFormState } from "@/lib/waitlist";

const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

async function postWaitlist(
    payload: Record<string, unknown>,
): Promise<WaitlistFormState> {
    const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return (await res.json()) as WaitlistFormState;
}

export default function SavLandingPage() {
    const [joinOpen, setJoinOpen] = useState(false);
    const [joinKey, setJoinKey] = useState(0);
    const [seedEmail, setSeedEmail] = useState("");
    const [seedWebsite, setSeedWebsite] = useState("");
    const [autoSubmit, setAutoSubmit] = useState(false);

    useEffect(() => {
        track("page_view");
    }, []);

    // Plain CTA buttons open the modal on the email step.
    const openJoin = () => {
        setSeedEmail("");
        setSeedWebsite("");
        setAutoSubmit(false);
        setJoinKey((k) => k + 1);
        setJoinOpen(true);
        track("modal_opened");
    };

    // The hero form already has the email — open the modal and submit it
    // straight away so the signup is captured in a single move.
    const openJoinWithEmail = (email: string, website: string) => {
        setSeedEmail(email);
        setSeedWebsite(website);
        setAutoSubmit(true);
        setJoinKey((k) => k + 1);
        setJoinOpen(true);
        track("modal_opened");
    };

    return (
        <div className="flex min-h-screen flex-col">
            <TopBar onJoin={openJoin} />
            <Hero onJoinWithEmail={openJoinWithEmail} />
            <Benefits />
            <MeetYetty />
            <Testimonials />
            <ClosingCta onJoin={openJoin} />
            <SiteFooter />
            <WaitlistDialog
                key={joinKey}
                open={joinOpen}
                onOpenChange={setJoinOpen}
                initialEmail={seedEmail}
                initialWebsite={seedWebsite}
                autoSubmit={autoSubmit}
            />
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

function Hero({
    onJoinWithEmail,
}: {
    onJoinWithEmail: (email: string, website: string) => void;
}) {
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = isValidEmail(email);
        setError(ok ? null : "Please enter a valid email.");
        if (!ok) return;
        onJoinWithEmail(email.trim(), website);
    };

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

                    <form onSubmit={onSubmit} className="mt-10 max-w-md">
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
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                inputMode="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError(null);
                                }}
                                placeholder="you@email.com"
                                aria-label="Email address"
                                className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
                            >
                                Join the waitlist
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                        {error && (
                            <p className="mt-2 pl-1 text-sm text-red-600">{error}</p>
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

const CONCERN_OPTIONS = [
    "Screen Addiction",
    "Online Safety",
    "AI Companionship",
    "Cyberbullying",
    "Porn Exposure",
    "Mental Health",
    "Video Games",
    "Other",
] as const;

function WaitlistDialog({
    open,
    onOpenChange,
    initialEmail,
    initialWebsite,
    autoSubmit,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialEmail: string;
    initialWebsite: string;
    autoSubmit: boolean;
}) {
    const [phase, setPhase] = useState<"email" | "done">("email");
    const [email, setEmail] = useState(initialEmail);
    const [website, setWebsite] = useState(initialWebsite);
    const [pending, setPending] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Optional enrichment, collected after the email is already saved.
    const [phone, setPhone] = useState("");
    const [childAges, setChildAges] = useState<string[]>([""]);
    const [concerns, setConcerns] = useState<string[]>([]);
    const [enrichPending, setEnrichPending] = useState(false);
    const [enrichSaved, setEnrichSaved] = useState(false);
    const inviteMessage =
        "I just joined Mums Training AI, Yetty's exclusive club shaping Sav: a judgement-free parenting coach for the digital age. Come join us 💛";
    const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
        `${inviteMessage} ${config.siteUrl}`,
    )}`;

    const addChild = () => setChildAges((c) => (c.length >= 10 ? c : [...c, ""]));
    const removeChild = (idx: number) =>
        setChildAges((c) => (c.length === 1 ? c : c.filter((_, i) => i !== idx)));
    const updateChild = (idx: number, value: string) =>
        setChildAges((c) => c.map((v, i) => (i === idx ? value : v)));

    const join = async (em: string) => {
        setPending(true);
        setError(null);
        try {
            const json = await postWaitlist({ email: em, website });
            if (json.status === "success") {
                track("signup_completed");
                setPhase("done");
            } else {
                setError(json.message ?? "Something went wrong. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        if (autoSubmit && isValidEmail(initialEmail)) void join(initialEmail);
        // Runs once on mount — the dialog remounts (via key) on every open.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitEmail = () => {
        if (pending) return;
        const ok = isValidEmail(email);
        setEmailError(ok ? null : "Please enter a valid email.");
        if (!ok) return;
        void join(email.trim());
    };

    const saveDetails = async () => {
        if (enrichPending) return;
        setEnrichPending(true);
        try {
            const json = await postWaitlist({
                mode: "enrich",
                email,
                phone,
                childrenAges: childAges,
                digitalConcerns: concerns,
            });
            if (json.status === "success") setEnrichSaved(true);
        } catch {
            // Best-effort — the signup is already saved, so never block here.
        } finally {
            setEnrichPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={!pending}
                aria-describedby={undefined}
                className="max-h-[90vh] gap-0 overflow-y-auto rounded-3xl border-neutral-200 bg-[#FBF7F2] p-0 sm:max-w-md"
            >
                {phase === "done" ? (
                    <div className="px-7 py-9">
                        <div className="text-center">
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                <Check className="h-7 w-7" />
                            </div>
                            <DialogTitle className="font-heading text-3xl tracking-tight text-neutral-900">
                                You&apos;re in.
                            </DialogTitle>
                            <p className="mx-auto mt-3 max-w-xs leading-relaxed text-neutral-600">
                                Welcome! You&apos;re a founding member of our exclusive
                                early-access club. Bring other parents in, as we shape Sav
                                together.
                            </p>

                            <div className="mx-auto mt-6 max-w-[16rem] rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 p-[1.5px] shadow-lg">
                                <div className="rounded-[15px] bg-white px-5 py-4">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">
                                            Founding Member
                                        </span>
                                    </div>
                                    <p className="mt-1.5 font-heading text-xl font-bold tracking-tight text-neutral-900">
                                        Early access unlocked
                                    </p>
                                    <p className="mt-0.5 text-xs text-neutral-500">
                                        You&apos;re in before everyone else
                                    </p>
                                </div>
                            </div>

                            <a
                                href={whatsappShareHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
                            >
                                <Heart className="h-4 w-4" />
                                Invite other parents
                            </a>
                        </div>

                        <div className="my-7 h-px w-full bg-neutral-200" />

                        {enrichSaved ? (
                            <p className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                                <Check className="h-4 w-4 text-emerald-600" />
                                Thanks — that helps us tailor Sav for you.
                            </p>
                        ) : (
                            <div>
                                <p className="text-sm font-medium text-neutral-900">
                                    Help us tailor Sav{" "}
                                    <span className="font-normal text-neutral-400">
                                        (optional)
                                    </span>
                                </p>

                                <label className="mt-4 block text-xs font-medium text-neutral-500">
                                    Your WhatsApp number
                                    <input
                                        type="tel"
                                        inputMode="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+234 801 234 5678"
                                        className="mt-1.5 w-full rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-base font-normal text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                                    />
                                </label>

                                <div className="mt-4 text-xs font-medium text-neutral-500">
                                    Your children&apos;s ages
                                    <div className="mt-1.5 space-y-2">
                                        {childAges.map((age, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="number"
                                                        inputMode="numeric"
                                                        min={0}
                                                        max={25}
                                                        value={age}
                                                        onChange={(e) =>
                                                            updateChild(
                                                                idx,
                                                                e.target.value.replace(/\D/g, ""),
                                                            )
                                                        }
                                                        placeholder={`Child ${idx + 1}`}
                                                        className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2.5 pr-11 text-base font-normal text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                    />
                                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
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
                                                className="inline-flex items-center gap-1.5 pl-2 pt-1 text-sm font-normal text-neutral-500 transition-colors hover:text-neutral-900"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                Add another child
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 text-xs font-medium text-neutral-500">
                                    Your top digital concerns as a parent{" "}
                                    <span className="font-normal text-neutral-400">
                                        (select all that apply)
                                    </span>
                                    <div className="mt-1.5 flex flex-wrap gap-2">
                                        {CONCERN_OPTIONS.map((opt) => (
                                            <button
                                                type="button"
                                                key={opt}
                                                onClick={() =>
                                                    setConcerns((c) =>
                                                        c.includes(opt)
                                                            ? c.filter((x) => x !== opt)
                                                            : [...c, opt],
                                                    )
                                                }
                                                className={cn(
                                                    "rounded-full border px-3.5 py-1.5 text-sm font-normal transition-colors",
                                                    concerns.includes(opt)
                                                        ? "border-amber-600 bg-amber-600 text-white"
                                                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900",
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={saveDetails}
                                    disabled={enrichPending}
                                    className="mt-5 w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    {enrichPending ? "Saving…" : "Save my details"}
                                </button>
                            </div>
                        )}

                        <a
                            href={config.bookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-300"
                        >
                            <Image
                                src="/bk.png"
                                alt="Digital Savvy Parenting book by Yetty Williams"
                                width={48}
                                height={64}
                                className="shrink-0 object-contain drop-shadow"
                            />
                            <span className="flex-1">
                                <span className="block text-xs font-semibold uppercase tracking-wider text-amber-700">
                                    While you wait
                                </span>
                                <span className="block text-sm font-medium text-neutral-900">
                                    Read Yetty&apos;s book, Digital Savvy Parenting
                                </span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="h-1 w-full bg-amber-600" />
                        <div className="px-7 py-8">
                            <DialogTitle className="font-heading text-2xl tracking-tight text-neutral-900">
                                Join the waitlist
                            </DialogTitle>
                            <DialogDescription className="mt-1.5 text-sm text-neutral-500">
                                Enter your email and you&apos;re in — we&apos;ll only email when
                                Sav is ready for you.
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

                            <input
                                type="email"
                                inputMode="email"
                                autoFocus
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        submitEmail();
                                    }
                                }}
                                placeholder="you@email.com"
                                className="mt-6 w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                            />
                            {emailError && (
                                <p className="mt-2 pl-1 text-sm text-red-600">{emailError}</p>
                            )}
                            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                            <button
                                type="button"
                                onClick={submitEmail}
                                disabled={pending}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                {pending ? "Joining…" : "Join the waitlist"}
                                {!pending && <ArrowRight className="h-4 w-4" />}
                            </button>
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
                            My 11yo melts down every time I say get off his video game 🎮
                        </Bubble>
                        <Bubble side="sav">
                            Pulling him off mid-game feels like leaving a live football match in
                            the middle to do the dishes — bad timing, not defiance.
                        </Bubble>
                        <Bubble side="sav">
                            Give a runway, not &ldquo;off now&rdquo;: try{" "}
                            <span className="font-medium">&ldquo;Come to the kitchen by 6pm&rdquo;</span>,
                            or a 10-min warning so he can finish.
                        </Bubble>
                        <Bubble side="user">that makes sense</Bubble>
                        <Bubble side="sav">He keeps his word, you keep your calm. 💛</Bubble>
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
        },
        {
            text: "If you need to stay relevant in this digital age, Yetty's guidance is by far the best. She shared practical tools and methods I could use immediately.",
            author: "Mum of two",
        },
        {
            text: "The most informative coaching I've attended in a long while. Yetty shares lots of personal experiences that every parent can relate to.",
            author: "Parents",
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
                            <p className="text-center font-semibold text-neutral-900">{review.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MeetYetty() {
    const credentials = [
        "📚 Author, Digital Savvy Parenting",
        "🏆 Forbes 30 Under 50",
        "🛡️ Trained in online safety & child safeguarding",
    ];

    return (
        <section className="px-6 py-20 md:px-12 md:py-24">
            <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-700">
                    Meet your guide
                </p>
                <h2 className="font-heading text-3xl leading-tight tracking-tight text-neutral-900 md:text-4xl">
                    Built by Yetty Williams
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                    A certified digital parenting coach trained in cyberpsychology, and a Yale
                    MBA. As founder of LagosMums, Yetty has reached millions of parents, from
                    Lagos to the world.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                    She built Sav for the hard moments of raising kids in the digital age, like
                    navigating screen time and AI. So you always have a calm, judgement-free
                    voice in your pocket, 24/7.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {credentials.map((c) => (
                        <span
                            key={c}
                            className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm text-neutral-600"
                        >
                            {c}
                        </span>
                    ))}
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
                    Get early access to personalize Sav for your family and help shape what it
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
                    href={config.yettyWilliamsUrl}
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
