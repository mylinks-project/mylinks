import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.logo.wine',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'http',
        hostname: 'media0.giphy.com',
      },
      {
        protocol: 'http',
        hostname: 'media1.giphy.com',
      },
      {
        protocol: 'http',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'http',
        hostname: 'media3.giphy.com',
      },
      {
        protocol: 'http',
        hostname: 'media4.giphy.com',
      },
      {
        protocol: 'http',
        hostname: 'media5.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media0.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media2.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media3.giphy.com',
      },
      {
        hostname: 'media4.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'media5.giphy.com',
      },
    ],
  },
};

export default nextConfig;
