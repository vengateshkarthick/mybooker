/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubuserscontent.com", "lh3.googleusercontent.com"],
  },
  // images: {
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'e7.pngegg.com',
  //         port: '*',
  //         pathname: '*',
  //       },
  //     ],
  //   },
};

export default nextConfig;
