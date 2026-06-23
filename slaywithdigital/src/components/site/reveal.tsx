"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and lifts its children into view the first time they enter the
 * viewport. Falls back to fully visible when reduced motion is preferred
 * (handled in CSS) or when IntersectionObserver is unavailable.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    as: Tag = "div",
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: "div" | "section" | "li" | "span";
}) {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (typeof IntersectionObserver === "undefined") {
            const id = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(id);
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref as React.Ref<never>}
            className={cn("reveal", visible && "is-visible", className)}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}
