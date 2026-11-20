import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  experimental: {
    cpus: 2,
    useTypeScriptCli: false,
    workerThreads: true,
  },
};

export default nextConfig;
