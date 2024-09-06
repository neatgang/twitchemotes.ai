/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "replicate.com",
      "replicate.delivery",
      "pbxt.replicate.delivery",
      "oaidalleapiprodscus.blob.core.windows.net",
      "utfs.io",
      "pprcanvas.s3.amazonaws.com",
      "img.clerk.com",
      "storage.googleapis.com",
      "images.unsplash.com",
      "fal.media",
      "v2.fal.media",
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
  // webpack: (config, { isServer }) => {
  //   // Add custom rule for handling .excalidrawlib files
  //   config.module.rules.push({
  //     test: /\.excalidrawlib$/,
  //     use: "raw-loader",
  //   });

  //   // Return the updated configuration
  //   return config;
  // },
};

module.exports = nextConfig;
