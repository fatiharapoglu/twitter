/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["picsum.photos", "nifemmkaxhltrtqltltq.supabase.co"],
    },
};

module.exports = nextConfig;
