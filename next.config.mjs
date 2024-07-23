// import withBundleAnalyzer from '@next/bundle-analyzer';

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

/** @type {import('next').NextConfig} */

const nextConfig = {
  productionBrowserSourceMaps: true,
  swcMinify: true,
  reactStrictMode: process.env.NODE_ENV === 'development',
  images: {
    domains: ['url']
  }
};

// export default bundleAnalyzer(nextConfig);
export default nextConfig;
