/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '165.232.120.122',
                port: '',
                pathname: '/uploads/**',
            }
        ]
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig

