/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';
const { PUBLIC_URL = 'http://localhost:3000' } = process.env;
// const nextConfig = {
//     output: 'export',
//     images: { unoptimized: true },
// }

// module.exports = nextConfig
const fonts = ['latin'];

const withBundleAnalyzer = bundleAnalyzer({
    enabled: true,
    openAnalyzer: false,
});

export default withBundleAnalyzer({
    rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${PUBLIC_URL}/api/:path*`,
            },
        ];
    },
    reactStrictMode: true,
    swcMinify: true,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        domains: ['images.unsplash.com', 'metahumanwarfare.com'],
        formats: ['image/avif', 'image/webp'],
        unoptimized: true,
    },
    headers() {
        const fontsHeadersConfig = fonts.flatMap((font) => {
            const fontHeaders = [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                },
            ];

            return [
                {
                    source: `/fonts/${font}.woff`,
                    headers: fontHeaders,
                },
                {
                    source: `/fonts/${font}.woff2`,
                    headers: fontHeaders,
                },
            ];
        });

        return fontsHeadersConfig;
    },
});
