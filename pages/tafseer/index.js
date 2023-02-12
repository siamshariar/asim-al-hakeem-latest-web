import { server } from "../../lib/config";
import { getTafseers, getAllPlaylists2 } from "../../lib/fetch";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import PostCardTafseer from "../../components/card/post-card-tafseer";
import Pagination from "../../components/pagination";

export default function BlogList({ tafseers, playlists }) {
  return (
    <>
      <Meta
        title="তাফসির"
        description="ড. মুহাম্মাদ সাইফুল্লাহ"
        url={`${server}/tafseer`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

      <section className="cat-page-top">
        <div className="page-width">
          <div className="box">
            <h1>
              তাফসির পোস্ট<span>৬</span>
            </h1>
            <p>
              আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিল অভ্র নামক এক
              যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।
            </p>
          </div>
        </div>
      </section>

      <section className="cat-page-tafseer">
        <div className="page-width">
          <div className="box">
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

      {/*<Pagination />*/}
    </>
  );
}

export async function getStaticProps(context) {
  //const res = await fetch(`${server}/api/tafseers/listpage`)
  //const tafseers = await res.json()

  const tafseers = await getTafseers();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      tafseers,
      playlists: playlists.playlists,
    },
  };
}
