/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://lamigraink-production-4e5f.up.railway.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization' },
        ],
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ['ledstattoo.com.br'],
  },
}

module.exports = nextConfig
