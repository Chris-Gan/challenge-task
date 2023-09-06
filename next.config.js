/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.simplywall.st'],
  },
};

module.exports = nextConfig;
