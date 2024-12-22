import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'localhost'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
