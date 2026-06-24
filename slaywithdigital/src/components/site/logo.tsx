import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

/** Text lockup: a red mark + "Slay with Digital", accent word in brand red. */
export function Logo({
    className,
    onDark = false,
}: {
    className?: string;
    onDark?: boolean;
}) {
    return (
        <span className={cn("inline-flex items-center gap-2.5", className)}>
            <span
                aria-hidden
                className="grid size-8 place-items-center rounded-md bg-brand font-display text-base font-extrabold text-white shadow-sm"
            >
                S
            </span>
            <span
                className={cn(
                    "font-display text-lg font-extrabold tracking-tight",
                    onDark ? "text-white" : "text-ink",
                )}
            >
                Slay with <span className="text-brand">{config.brand.accentWord}</span>
            </span>
        </span>
    );
}
