/** @type {import('next,module').NextConfig} */

const cspHeader = `
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`; // default-src 'self'; img-src 'self' blob: data:; upgrade-insecure-requests; - Prod only

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  images: {
    domains: ['url'],
  },
};

export default nextConfig;
