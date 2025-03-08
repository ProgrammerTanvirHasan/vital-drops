/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/bloodBanks",
  //       destination: "/events",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
