/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/640/**',
      },
      {
        protocol: 'https',
        hostname: 'dailymix-images.scdn.co',
        port: '',
        pathname: '/v2/img/**',
      },
      {
        protocol: 'https',
        hostname: 'thisis-images.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
