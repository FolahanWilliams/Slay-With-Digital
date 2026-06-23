import { NextResponse } from "next/server";

import {
    ADMIN_COOKIE,
    adminConfigured,
    expectedToken,
    passwordMatches,
    sessionCookieOptions,
} from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const form = await req.formData();
    const action = String(form.get("action") ?? "login");
    const origin = new URL(req.url).origin;

    if (action === "logout") {
        const res = NextResponse.redirect(`${origin}/admin`, { status: 303 });
        res.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
        return res;
    }

    if (!adminConfigured()) {
        return NextResponse.redirect(`${origin}/admin`, { status: 303 });
    }

    const password = String(form.get("password") ?? "");
    if (!passwordMatches(password)) {
        return NextResponse.redirect(`${origin}/admin?error=1`, { status: 303 });
    }

    const res = NextResponse.redirect(`${origin}/admin`, { status: 303 });
    res.cookies.set(ADMIN_COOKIE, expectedToken(), sessionCookieOptions);
    return res;
}
