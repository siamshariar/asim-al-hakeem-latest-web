import { server } from "../../lib/config";
import { getPapers, getAllPlaylists2 } from "../../lib/fetch";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import PostCardPaper from "../../components/card/post-card-paper";
import Pagination from "../../components/pagination";

export default function BlogList({ papers, playlists }) {
  return (
    <>
      <Meta
        title="রিসার্চ পেপারস | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah"
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/research-papers`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

      <section className="cat-page-top">
        <div className="page-width">
          <div className="box">
            <h1>রিসার্চ পেপারস{/* <span>১২</span> */}</h1>
            {/*<p>আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিল অভ্র নামক এক যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।</p>*/}
          </div>
        </div>
      </section>

      <section className="cat-page-papers">
        <div className="page-width">
          <div className="box">
            {/*<div className="row row-r">*/}
            {/*  {papers &&*/}
            {/*    papers.length &&*/}
            {/*    papers.map((paper) => (*/}
            {/*      <div className="col col-r s12 xl6" key={paper.id}>*/}
            {/*        <PostCardPaper paper={paper} />*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

          <p style={{ marginBottom: "30px" }}>
            আপডেট করা হবে ইন শা আল্লাহ।
          </p>

          </div>
        </div>
      </section>

      {/*<Pagination />*/}
    </>
  );
}

export async function getStaticProps(context) {
  //const res = await fetch(`${server}/api/papers/listpage`)
  //const papers = await res.json()

  const papers = await getPapers();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      papers,
      playlists: playlists.playlists,
    },
  };
}
