/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')()

const { STORYBLOK_TOKEN, NODE_ENV } = process.env

const nextConfig = withNextIntl({
    env: {
    STORYBLOK_TOKEN,
    APP_ENV: NODE_ENV
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
    },
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'a.storyblok.com',
      }
    ],
    domains: ['a.storyblok.com', 'localhost:3000'],
  },
})

module.exports = nextConfig
