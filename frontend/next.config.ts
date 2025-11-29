import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/flask/:path*',
        destination: 'http://localhost:4000/api/flask/:path*',
      },
    ];
  },
};

export default nextConfig;
