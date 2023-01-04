/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  font-src 'self';  
  frame-src 'self' https://www.youtube.com https://auth.magic.link https://static.doubleclick.net https://www.youtube.com https://play.google.com http://0.0.0.0:3000;
`

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'i.ytimg.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
