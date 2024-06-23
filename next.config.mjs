/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["url"],
  },
  output: 'export',
};

module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self' https: ; script-src 'self' ; object-src 'none'"
          },
        ],
      },
    ]
  },
}


export default nextConfig;
