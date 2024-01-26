/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oss.us.petlibro.com",
      },
    ],
  },
};

export default nextConfig;
