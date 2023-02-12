// post this month
import PostCard from "../card/post7";

export default function HomePostList({ posts }) {
  return (
    <section className="h-sec h3-post-2">
      <div className="page-width">
        <div className="box">
          <h2 className="h3-sec-title-2">এ মাসের গুরুত্বপূর্ণ পোস্ট সমূহ</h2>

          <div className="row row-r">
            <div className="col col-r s12 m6 l3">
              <PostCard post={posts[0]} />
            </div>

            <div className="col col-r s12 m6 l3">
              <PostCard post={posts[1]} />
            </div>

            <div className="col col-r s12 m6 l3">
              <PostCard post={posts[2]} />
            </div>

            <div className="col col-r s12 m6 l3">
              <PostCard post={posts[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
