/** @type {import('next').NextConfig} */
const path = require('path')
const i18n = require('./next-i18next.config')
const { STORYBLOK_TOKEN, NODE_ENV } = process.env

const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const nextConfig = {
    env: {
    STORYBLOK_TOKEN,
    APP_ENV: NODE_ENV
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['a.storyblok.com'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compiler: {
    styledComponents: true
  },
  ...i18n,
  webpack: (config, options) => {
    config.plugins.push(new DuplicatePackageCheckerPlugin())
    return config
  }
}

module.exports = nextConfig
