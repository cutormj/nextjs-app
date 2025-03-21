import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // For Picsum images
        port: '', // No specific port
        pathname: '/**', // Allow all paths
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos', // For redirected Fastly CDN images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // For Pinterest-hosted images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-domain.com', // For custom images from your domain
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
