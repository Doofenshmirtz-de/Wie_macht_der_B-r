/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig
