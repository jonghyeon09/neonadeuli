/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.cha.go.kr',
        port: '',
        pathname: '/unisearch/images/history_site/**',
      },
      {
        protocol: 'https',
        hostname: 'zyyosrdkcdcm25870576.cdn.ntruss.com',
        port: '',
        pathname: '/neonadeuli-bucket/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cha/:path*',
        destination: `${process.env.OPEN_API}/cha/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${process.env.API_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
