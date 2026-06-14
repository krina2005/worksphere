import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/worksphere",
  assetPrefix: "/worksphere/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;