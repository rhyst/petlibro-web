/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS ? "/petlibro-web" : "",
  reactStrictMode: true,
  output: process.env.GITHUB_ACTIONS ? "export" : undefined,
  distDir: "out",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oss.us.petlibro.com",
      },
    ],
  },
};

export default nextConfig;
