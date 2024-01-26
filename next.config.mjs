/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS ? "/petlibro-web" : "",
  reactStrictMode: true,
  output: "export",
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
