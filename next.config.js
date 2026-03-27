/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/platform",
        destination: "https://scientiaos.io/platform",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "https://scientiaos.io/how-it-works",
        permanent: true,
      },
      {
        source: "/security",
        destination: "https://scientiaos.io/security",
        permanent: true,
      },
      {
        source: "/governance",
        destination: "https://scientiaos.io/governance",
        permanent: true,
      },
      {
        source: "/cohort",
        destination: "https://scientiaos.io/admissions/apply",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
