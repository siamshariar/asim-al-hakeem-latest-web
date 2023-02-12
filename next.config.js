module.exports = {
  async redirects() {
    return [
      {
        source: "/lectures",
        destination: "/lectures/UUjTCGZUzqlNSCnFxHJBGCoQ",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "localhost",
      "blog-dev1dit.vercel.app",
      "muhammadsaifullah.com",
      "www.muhammadsaifullah.com",
      "i.ytimg.com",
    ],
  },
};
