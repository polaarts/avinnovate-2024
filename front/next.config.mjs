/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thedemostop.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
