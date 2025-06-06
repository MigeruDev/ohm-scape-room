import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/room1',
        permanent: true, // Or false, depending on preference for SEO and browser caching
      },
    ];
  },
};

export default nextConfig;
