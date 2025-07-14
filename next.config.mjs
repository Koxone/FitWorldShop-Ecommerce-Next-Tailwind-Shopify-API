/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.shopify.com'],
  },

  productionBrowserSourceMaps: true,

  experimental: {
    serverActions: {},
  },
};

export default nextConfig;
