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
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cha/:path*',
        destination: `${process.env.OPEN_API}/:path*`,
      },
    ];
  },
};

export default nextConfig;
