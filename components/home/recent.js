import { youtube } from "../../lib/config";
import PostCard from "../card/post-card-video2";
import SectionHeader from "../section-header";

export default function HomeRecent({ lectures }) {
  return (
    <section className="h-sec opt_home_blogs">
      <div className="page-width">
        <div className="box">
          <SectionHeader //
            title="সাম্প্রতিক"
            link={`/lectures/${youtube.uploadPlaylistID}`}
          />

          <div className="row row-r">
            <div className="col col-r s12 l12">
              <div className="opt_home_blog_left">
                <div className="row row-r">
                  {lectures.videoLists &&
                    lectures.videoLists.map((item) => (
                      <div className="col col-r s12 m6 l6 xl4" key={item.id}>
                        <PostCard
                          item={item}
                          statistics={lectures.videoStats}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
