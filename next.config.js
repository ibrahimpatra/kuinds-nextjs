// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'customer-assets.emergentagent.com',
      'images.unsplash.com',
      'images.pexels.com',
      'i.ibb.co',
    ],
  },
};

module.exports = nextConfig;