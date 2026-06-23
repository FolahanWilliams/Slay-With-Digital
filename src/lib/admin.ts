import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "sav_admin";
const SESSION_HOURS = 12;

function password(): string {
    return process.env.ADMIN_PASSWORD ?? "";
}

/** The admin page is only reachable once ADMIN_PASSWORD is set. */
export function adminConfigured(): boolean {
    return password().length > 0;
}

function safeEqual(a: string, b: string): boolean {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ab.length !== bb.length) return false;
    return timingSafeEqual(ab, bb);
}

/**
 * A deterministic token derived from the password, stored in an httpOnly
 * cookie. We never store the password itself, and rotating the password
 * invalidates every existing session.
 */
export function expectedToken(): string {
    return createHmac("sha256", password()).update("sav-admin-session-v1").digest("hex");
}

export function passwordMatches(input: string): boolean {
    return adminConfigured() && safeEqual(input, password());
}

export function sessionValid(token: string | undefined): boolean {
    return adminConfigured() && !!token && safeEqual(token, expectedToken());
}

export const sessionCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
};
