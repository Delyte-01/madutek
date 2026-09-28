import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.43.22"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all images from Cloudinary
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",

        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",

        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
