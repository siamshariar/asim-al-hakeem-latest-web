import { server } from "../../lib/config";
import {
  getTafseers,
  getTafseerDetails,
  getRelatedTafseers,
  getAllPlaylists2,
} from "../../lib/fetch";
import Link from "next/link";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import PostCardTafseer from "../../components/card/post-card-tafseer";
import parse from "html-react-parser";
import Share from "../../components/share";

export default function BlogDetail({ detail, tafseers, playlists }) {
  return (
    <>
      <Meta
        title={detail.postTitle}
        description="ড. মুহাম্মাদ সাইফুল্লাহ"
        url={`${server}/tafseer/${detail.postSlug}`}
        image={`${server}/img/id/default_share.png`}
        type="article"
      />

      <Header playlists={playlists} />

      <section className="blog-detail-top">
        <div className="page-width">
          <div className="box">
            <Link href={detail.catURL}>
              <a className="cat-r">{detail.catText}</a>
            </Link>

            <Link href={`/tafseer/${detail.postSlug}`}>
              <a className="heading-r">{detail.postTitle}</a>
            </Link>
            <span className="date-r">{detail.postDate}</span>
          </div>
        </div>
      </section>

      <section className="blog-detail-ctn">
        <div className="page-width">
          <div className="box">
            <div className="blog-area">
              <div className="blog-detail">{parse(detail.postContent)}</div>

              <div className="blog-action">
                <div className="blog-tag">
                  <h2>ট্যাগ</h2>

                  <Link href="/tafseer/">
                    <a>#কুরআন</a>
                  </Link>
                  <Link href="/tafseer/">
                    <a>#হাদিস</a>
                  </Link>
                </div>

                <div className="blog-share">
                  <Share
                    urlWeb={`tafseer/${detail.postSlug}`}
                    urlMobile={detail.postSlug}
                    title={detail.postTitle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-page-related">
        <div className="page-width">
          <div className="box">
            <h1 className="title-r">
              <span>সম্পর্কিত পোস্ট</span>
            </h1>

            <div className="row row-r">
              {tafseers &&
                tafseers.length &&
                tafseers.map((tafseer) => (
                  <div className="col col-r s12 l6 xl4" key={tafseer.id}>
                    <PostCardTafseer tafseer={tafseer} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  //const resRelated = await fetch(`${server}/api/tafseers/related`)
  //const tafseers = await resRelated.json()

  const slug = params.slug;
  const detail = await getTafseerDetails(slug);
  const tafseers = await getRelatedTafseers();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      detail,
      tafseers,
      playlists: playlists.playlists,
    },
  };
}

export async function getStaticPaths() {
  //const res = await fetch(`${server}/api/tafseers/listpage`)
  //const tafseers = await res.json()

  const tafseers = await getTafseers();

  const paths = tafseers.map((tafseer) => ({
    params: { slug: tafseer.postSlug },
  }));

  return {
    paths,
    fallback: false,
  };
}
