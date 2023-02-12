// import { youtube } from "../../lib/config";
// import Link from "next/link";
import SectionHeader from "../section-header";
import PostCard from "../card/post-card-article";

export default function HomeArticles({ articles }) {
  return (
    <section className="h-sec h3-post-1">
      <div className="page-width">
        <div className="box">
          <SectionHeader //
            title="প্রবন্ধ সমূহ"
            link="/articles/"
          />

          <div className="row row-r">
            <div className="col col-r s12 l12">
              <div className="h3-post-left">
                <div className="row row-r">
                  {articles &&
                    articles.length &&
                    articles.map((article) => (
                      <div className="col col-r s12 m4" key={article.id}>
                        <PostCard article={article} />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* <div className="col col-r s12 l4">
              <div className="h3-post-right">
                <div className="h3-right-title">ক্যাটেগরি</div>

                <div className="h3-cat-wrap">
                  <div className="h3-cat-card">
                    <Link href={`/lectures/${youtube.uploadPlaylistID}`}>
                      <a className="card card-r">
                        <i className="fas fa-photo-video"></i>
                        <span>ভিডিও লেকচার</span>
                      </a>
                    </Link>
                  </div>

                  <div className="h3-cat-card">
                    <Link href="/books/">
                      <a className="card card-r">
                        <i className="fas fa-book"></i>
                        <span>বই সমূহ</span>
                      </a>
                    </Link>
                  </div>

                  <div className="h3-cat-card">
                    <Link href="/research-papers/">
                      <a className="card card-r">
                        <i className="far fa-file-alt"></i>
                        <span>রিসার্স পেপারস</span>
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="h3-right-title">আমাদের সম্পর্কে</div>

                <div className="h3-right-text">
                  আপনি যদি আপনার প্রশ্ন বা সমস্যার উত্তর না পেয়ে থাকেন, তবে
                  অনুগ্রহ করে নিচের ফর্ম
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
