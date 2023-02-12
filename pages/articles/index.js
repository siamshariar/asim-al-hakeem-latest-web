import { server } from "../../lib/config";
import { getArticles, getAllPlaylists2 } from "../../lib/fetch";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import PostCardArticle from "../../components/card/post-card-article";
import PostCardArticle2 from "../../components/card/post-card-article2";
import Pagination from "../../components/pagination";

export default function BlogList({ articles, playlists }) {
  return (
    <>
      <Meta
        title="প্রবন্ধ সমূহ | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah"
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/articles`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

      <section className="cat-page-top">
        <div className="page-width">
          <div className="box">
            <h1>
              প্রবন্ধ সমূহ
              {/*<span>৯</span>*/}
            </h1>
            {/*<p>আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিল অভ্র নামক এক যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।</p>*/}
          </div>
        </div>
      </section>

      <section className="cat-page-articles">
        <div className="page-width">
          <div className="box">
            <div className="row row-r">
              {articles &&
                articles.length &&
                articles.map((article) => (
                  <div className="col col-r s12 xl4" key={article.id}>
                    <PostCardArticle article={article} />
                  </div>
                ))}
            </div>
            {/*<p style={{ margin: "10px 0 30px 0" }}>*/}
            {/*  আরও দেখুন:{" "}*/}
            {/*  <a*/}
            {/*    href="https://islamhouse.com/bn/author/25506/articles/showall/1"*/}
            {/*    target="_blank"*/}
            {/*  >*/}
            {/*    https://islamhouse.com/bn/author/25506/articles/showall/1*/}
            {/*  </a>*/}
            {/*</p>*/}
          </div>
        </div>
      </section>

      {/*<section className="cat-page-articles">*/}
      {/*		<div className="page-width">*/}
      {/*			<div className="box">*/}
      {/*				<div className="row row-r">*/}
      {/*				{*/}
      {/*					articles && articles.length && articles.map(article =>*/}
      {/*						<div className="col col-r s12 xl4" key={article.id}>*/}
      {/*							<PostCardArticle2 article={article} />*/}
      {/*						</div>*/}
      {/*					)*/}
      {/*				}*/}
      {/*				</div>*/}
      {/*			</div>*/}
      {/*		</div>*/}
      {/*	</section>*/}

      {/*<Pagination />*/}
    </>
  );
}

export async function getStaticProps(context) {
  //const res = await fetch(`${server}/api/articles/listpage`)
  //const articles = await res.json()

  const articles = await getArticles();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      articles,
      playlists: playlists.playlists,
    },
  };
}
