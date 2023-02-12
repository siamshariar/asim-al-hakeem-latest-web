import {
  getOptHomeImages,
  getHomeLectures,
  getOptHomeQuotes,
  getOptHomeBooks,
  getHomeOrganizations,
  getHomeArticles,
  getHomePapers,
  getAllPlaylists2,
  getHome3Posts4,
  getHomeBooks,
} from "../lib/fetch";

import Meta from "../components/meta";
import Header from "../components/header";
import HomeRecent from "../components/home/recent";
// import HomeQuoteSlider from "../components/home2/quote-slider";
// import HomeBookList from "../components/home2/books";
// import HomeOrganizations from "../components/home/organizations";
import HomeBanner from "../components/home/banner";
import HomeQuote from "../components/home/quote";
import HomeArticles from "../components/home/articles";
// import HomePostList2 from "../components/home/post-list2";
import HomeBooks from "../components/home/books";
// import HomePostList4 from "../components/home/post-list4";
import HomeOrganizations from "../components/home/organizations2";
// import HomeBookList from "../components/home/books";
// import HomeFeatured from "../components/home2/featured";
import HomePapers from "../components/home/papers";
import Image from "next/image";
import {server} from "../lib/config";

export default function Home({
  lectures,
  organizations,
  articles,
  papers,
  playlists,
  posts4,
  organizations2,
  books,
}) {
  return (
    <>
      <Meta
        title=""
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url="www.muhammadsaifullah.com"
        image="/img/id/logo.png"
        type="website"
      />

      <Header playlists={playlists} />

      <div className="opt_home_ctn">
        <HomeBanner />
        <HomeBooks books={books} />
        <HomeQuote />
        <HomeArticles articles={articles} />
        <HomeRecent lectures={lectures} />
        {/*<HomePapers papers={papers} />*/}
        {/*<HomeOrganizations organizations={organizations} />*/}




      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const images = await getOptHomeImages();
  // const blogs = await getOptHomeBlogs();
  const lectures = await getHomeLectures();
  const quotes = await getOptHomeQuotes();
  // const books = await getOptHomeBooks();
  const organizations = await getHomeOrganizations();
  const articles = await getHomeArticles();
  // const articles = await getArticles()
  const papers = await getHomePapers();
  const playlists = await getAllPlaylists2();
  const posts4 = await getHome3Posts4();
  const organizations2 = await getHomeOrganizations();
  const books = await getHomeBooks();

  return {
    props: {
      images,
      lectures,
      quotes,
      organizations,
      articles,
      papers,
      playlists: playlists.playlists,
      organizations2,
      posts4,
      books,
    },
  };
}
