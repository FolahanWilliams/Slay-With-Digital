import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const ContentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
    { key: "Content-Security-Policy", value: ContentSecurityPolicy },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
];

const nextConfig: NextConfig = {
    poweredByHeader: false,

    // Pin the workspace root: this app is developed inside the sav-waitlist
    // repo (which has its own lockfile), so Next must not infer the parent.
    turbopack: { root: projectRoot },

    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },

    async redirects() {
        return [
            { source: "/favicon.ico", destination: "/icon", permanent: true },
        ];
    },
};

export default nextConfig;
