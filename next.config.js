/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["image.tmdb.org", "api.dicebear.com"] },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
