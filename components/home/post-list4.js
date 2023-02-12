import SectionHeader from "../section-header";
import PostCard1 from "../card/post1";
import PostCard2 from "../card/post2";
import PostCard3 from "../card/post-card-article";

export default function HomePostList({ posts }) {
  return (
    <section className="h-sec h3-post-4">
      <div className="page-width">
        <div className="box">
          <SectionHeader //
            title="তাফসির"
            link="/tafseer/"
          />
          <div className="row row-r">
            <div className="col col-r s12 l8 mb-0">
              <div className="row row-r">
                <div className="col col-r s12">
                  <PostCard1 post={posts[0]} />
                </div>
              </div>
              <div className="row row-r">
                <div className="col col-r s12 l6">
                  <PostCard3 article={posts[1]} />
                </div>
                <div className="col col-r s12 l6">
                  <PostCard3 article={posts[2]} />
                </div>
              </div>
            </div>

            <div className="col col-r s12 l4">
              <PostCard2 post={posts[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
