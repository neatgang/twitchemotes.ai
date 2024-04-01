/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "replicate.com",
      "replicate.delivery",
      "pbxt.replicate.delivery",
      "oaidalleapiprodscus.blob.core.windows.net",
      "utfs.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
