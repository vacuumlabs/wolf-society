/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['gsap'],
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'sk'],
    localeDetection: true,
  },
}

module.exports = nextConfig
