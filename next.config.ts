// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Wikipediaの画像ホスト名を追加
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image1.gamme.com.tw',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;