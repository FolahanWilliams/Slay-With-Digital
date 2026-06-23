"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { sevenCs, config } from "@/lib/config";
import { cn } from "@/lib/utils";

export function SevenCs() {
    const [active, setActive] = useState(0);
    const current = sevenCs[active];

    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6">
            {/* Selector list */}
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-1">
                {sevenCs.map((c, i) => {
                    const isActive = i === active;
                    return (
                        <li key={c.title}>
                            <button
                                type="button"
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                                aria-pressed={isActive}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200",
                                    isActive
                                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                                        : "border-line bg-paper text-ink hover:border-brand/40 hover:bg-brand-soft/40",
                                )}
                            >
                                <span
                                    className={cn(
                                        "grid size-7 shrink-0 place-items-center rounded-md font-display text-sm font-bold",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "bg-brand-soft text-brand",
                                    )}
                                >
                                    {c.letter}
                                </span>
                                <span className="font-display text-sm font-bold tracking-tight sm:text-base">
                                    {c.title}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Detail panel */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-cream p-7 sm:p-9">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-10 font-display text-[10rem] font-extrabold leading-none text-brand/10 select-none"
                >
                    {current.letter}
                </div>
                <div className="relative">
                    <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand">
                        The 7 C&apos;s · {current.letter} of {sevenCs.length}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                        {current.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
                        {current.copy}
                    </p>
                    <a
                        href={config.quizUrl}
                        className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
                    >
                        See where your business stands
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
