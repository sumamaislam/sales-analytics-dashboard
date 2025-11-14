/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable static optimization for pages that use client-side features
    staticPageGenerationTimeout: 1000,
  },
  // Ensure proper handling of client components
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
