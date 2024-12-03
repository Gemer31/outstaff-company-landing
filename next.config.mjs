import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['firebasestorage.googleapis.com'],
    },
    output: 'standalone',
    optimizeFonts: true,
    compress: true
    // productionBrowserSourceMaps
};

export default withNextIntl(nextConfig);
