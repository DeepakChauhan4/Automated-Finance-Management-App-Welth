/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['randomuser.me'],
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: [],
    },
};

module.exports = nextConfig;
