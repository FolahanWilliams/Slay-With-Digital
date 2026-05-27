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
    const hideChrome = pathname?.startsWith("/sav");

    return (
        <>
            {!hideChrome && navigation}
            <main className="flex-grow">{children}</main>
            {!hideChrome && footer}
        </>
    );
}
