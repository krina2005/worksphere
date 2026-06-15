import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/worksphere",
  assetPrefix: "/worksphere",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;