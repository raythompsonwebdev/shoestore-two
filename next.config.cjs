/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  poweredByHeader: false,

  experimental: {
    //warn Experimental features are not covered by semver, and may cause unexpected or broken application behavior. Use at your own risk.
    // next/font not working due to SWC compiler disabled. Opted in. may cause errors?
    // forceSwcTransforms: true,
    // serverActions: true,
  },
};

module.exports = nextConfig;
