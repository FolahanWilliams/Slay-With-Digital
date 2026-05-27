import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // /sav was the original route — keep redirecting it to / so any links
    // shared during the early waitlist still resolve.
    async redirects() {
        return [{ source: "/sav", destination: "/", permanent: true }];
    },
};

export default nextConfig;
