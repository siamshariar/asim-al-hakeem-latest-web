module.exports = {
  async redirects() {
    return [
      {
        source: "/lectures",
        destination: "/lectures/UUWsdcrre0WbCWML_PnuzoAg",
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
      "img.youtube.com",
      "i.ytimg.com",
    ],
  },
};
