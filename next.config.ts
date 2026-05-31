import type { NextConfig } from "next";

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
    // Don't advertise the framework.
    poweredByHeader: false,

    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },

    async redirects() {
        return [
            // /sav was the original route — keep redirecting it to / so any links
            // shared during the early waitlist still resolve.
            { source: "/sav", destination: "/", permanent: true },
            // The app generates /icon (from icon.tsx) rather than /favicon.ico,
            // so point legacy favicon requests at it to avoid a 404.
            { source: "/favicon.ico", destination: "/icon", permanent: true },
        ];
    },
};

export default nextConfig;
