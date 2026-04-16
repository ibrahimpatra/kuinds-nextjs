/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🔥 THIS is the missing piece

  reactStrictMode: true,

  images: {
    unoptimized: true, // required for static export
    domains: [
      'customer-assets.emergentagent.com',
      'images.unsplash.com',
      'images.pexels.com',
      'i.ibb.co',
      'www.google.com'
    ],
  },
};

module.exports = nextConfig;
