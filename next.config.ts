import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // เพิ่ม hostname ที่ต้องการอนุญาต
  },
};

export default nextConfig;
