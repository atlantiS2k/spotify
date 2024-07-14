/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dfrcfmgqtddlpwmkcbmj.supabase.co',
      },
    ],
  },
};

export default nextConfig;
