/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3249',
                pathname: '/uploads/**',
            }
        ]
    }
}

module.exports = nextConfig

