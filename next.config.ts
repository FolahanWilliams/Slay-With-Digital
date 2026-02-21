import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lagosmums.com" },
      { protocol: "https", hostname: "enterprisenation.blob.core.windows.net" },
      { protocol: "http", hostname: "emotionalwell-being.org" },
      { protocol: "https", hostname: "images.groovetech.io" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
