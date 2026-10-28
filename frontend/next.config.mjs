/** @type {import('next').NextConfig} */
const nextConfig = {
  // The frontend folder is its own project (stops Next.js guessing from other lockfiles)
  turbopack: { root: import.meta.dirname },
  images: {
    // Allow images served from the backend uploads folder
    remotePatterns: [{ protocol: "http", hostname: "localhost", port: "5000" }],
  },
};

export default nextConfig;
