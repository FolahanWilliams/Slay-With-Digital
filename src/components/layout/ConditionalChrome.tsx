"use client";

import { usePathname } from "next/navigation";

export function ConditionalChrome({
    navigation,
    footer,
    children,
}: {
    navigation: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Sav landing owns its own chrome — only the legacy /about, /services,
    // /contact pages keep the Slay With Digital nav/footer.
    const hideChrome = pathname === "/";

    return (
        <>
            {!hideChrome && navigation}
            <main className="flex-grow">{children}</main>
            {!hideChrome && footer}
        </>
    );
}
