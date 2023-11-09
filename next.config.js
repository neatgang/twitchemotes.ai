/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "replicate.com",
      "replicate.delivery",
      "pbxt.replicate.delivery",
      "oaidalleapiprodscus.blob.core.windows.net",
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
};

module.exports = nextConfig;
