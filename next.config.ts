import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Inbound links from the AMRabbits farm section, which this site replaces.
      { source: "/farm/eggs", destination: "/hatching-eggs", permanent: true },
      { source: "/farm/chickens", destination: "/chickens", permanent: true },
      { source: "/farm/ducks", destination: "/ducks", permanent: true },
      { source: "/farm/quail", destination: "/quail", permanent: true },
      { source: "/farm/reserve", destination: "/reserve", permanent: true },
      { source: "/farm/available-livestock", destination: "/available", permanent: true },
      { source: "/farm/firstfruits-farmstead", destination: "/farm-shop", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
