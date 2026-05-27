"use client";

import { useActionState, useState, useTransition } from "react";
import { ArrowRight, Plus, X } from "lucide-react";
import { joinWaitlist, type WaitlistFormState } from "./actions";

const WHATSAPP_LINK = "https://wa.me/PLACEHOLDER"; // TODO: swap with real wa.me link
const LAGOSMUMS_LINK = "https://lagosmums.com";

const initialState: WaitlistFormState = { status: "idle" };

export default function SavLandingPage() {
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

    return (
        <div className="flex min-h-screen flex-col">
            {/* Top bar */}
            <header className="flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
                <span className="font-heading text-2xl tracking-tight text-neutral-900 md:text-3xl">
                    Sav
                </span>
                <a
                    href={LAGOSMUMS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-500 transition-colors hover:text-neutral-900 md:text-sm"
                >
                    by LagosMums
                </a>
            </header>

            {/* Hero */}
            <section className="flex flex-1 items-center justify-center px-6 pb-16 md:px-10">
                <div className="w-full max-w-xl">
                    {state.status === "success" ? (
                        <SuccessState />
                    ) : (
                        <>
                            <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                                A third parent.
                                <br />
                                In your pocket.
                            </h1>
                            <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
                                A non-judgemental parenting coach for the AI era. Available
                                whenever you need a wiser voice — at 3am, on the school run, or
                                mid-meltdown.
                            </p>

                            <form action={onSubmit} className="mt-10 space-y-5">
                                {/* Email row */}
                                <div>
                                    <div className="flex items-center gap-2 rounded-full border border-neutral-300 bg-white pl-5 pr-1 py-1 focus-within:border-neutral-900">
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="you@email.com"
                                            aria-label="Email address"
                                            className="flex-1 bg-transparent py-2 text-base text-neutral-900 placeholder:text-neutral-400 outline-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={pending}
                                            aria-label="Join the waitlist"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                    {state.fieldErrors?.email && (
                                        <p className="mt-2 pl-5 text-sm text-red-600">
                                            {state.fieldErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Optional disclosure */}
                                <button
                                    type="button"
                                    onClick={() => setShowOptional((v) => !v)}
                                    className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
                                >
                                    {showOptional ? "Hide optional questions" : "Tell us more (optional) →"}
                                </button>

                                {showOptional && (
                                    <div className="space-y-6 border-t border-neutral-200 pt-6">
                                        {/* Children ages */}
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

                                        {/* AI concern */}
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
                        </>
                    )}
                </div>
            </section>

            {/* Footer attribution */}
            <footer className="px-6 pb-8 text-center md:px-10">
                <p className="text-xs text-neutral-500 md:text-sm">
                    Brought to you by{" "}
                    <a
                        href={LAGOSMUMS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 underline-offset-4 hover:underline"
                    >
                        Yetty Williams
                    </a>
                    , founder of LagosMums.
                </p>
            </footer>
        </div>
    );
}

function SuccessState() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                    You&apos;re in.
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-600 md:text-lg">
                    You&apos;re part of the first group. As a thank-you, hop into our WhatsApp
                    to chat with us directly and help shape what Sav becomes.
                </p>
            </div>
            <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
                Chat with us on WhatsApp
                <ArrowRight className="h-4 w-4" />
            </a>
        </div>
    );
}
