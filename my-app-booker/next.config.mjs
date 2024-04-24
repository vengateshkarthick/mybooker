/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubuserscontent.com", "lh3.googleusercontent.com"],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  }
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
