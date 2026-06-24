"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const links = [
    { href: "#program", label: "The 7 C's" },
    { href: "#services", label: "Services" },
    { href: "#results", label: "Results" },
];

export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? "border-b border-line bg-paper/85 backdrop-blur-md"
                    : "border-b border-transparent bg-transparent",
            )}
        >
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                <a href="#top" aria-label={config.brand.name}>
                    <Logo />
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="text-sm font-medium text-muted transition-colors hover:text-ink"
                        >
                            {l.label}
                        </a>
                    ))}
                    <a
                        href={config.quizUrl}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                        Free audit
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="grid size-10 place-items-center rounded-md text-ink md:hidden"
                >
                    {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </nav>

            {open && (
                <div className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden">
                    <div className="flex flex-col">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="border-b border-line py-3.5 text-base font-medium text-ink"
                            >
                                {l.label}
                            </a>
                        ))}
                        <a
                            href={config.quizUrl}
                            onClick={() => setOpen(false)}
                            className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-3 text-base font-semibold text-white"
                        >
                            Take the free audit
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
