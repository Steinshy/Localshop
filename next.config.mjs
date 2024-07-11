/** @type {import('next,module').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['url'],
  },
};

export default nextConfig;
