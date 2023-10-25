/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['gsap'],
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US'],
  },
  images: {
    domains: ['images.ctfassets.net', 'cdn-images-1.medium.com'],
  },
  eslint: {
    // Ignoring for now until all new eslint errors are resolved
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
