import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // เพิ่ม hostname ที่ต้องการอนุญาต
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/fitbuddy-70e36.firebasestorage.app/o/**",
      },
    ],
  },
};

export default nextConfig;
