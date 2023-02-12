import SectionHeader from "../section-header";
import PostCard1 from "../card/post1";
// import PostCard2 from "../card/post2";

export default function HomeBooks({ books }) {
  return (
    <section className="h-sec h3-post-3">
      <div className="page-width">
        <div className="box">
          <SectionHeader //
            title="বই সমূহ"
            link="/books/"
          />
          <div className="row row-r">
            <div className="col col-r s12 l12">
              <div className="row row-r">
                <div className="col col-r s12 l4">
                  <PostCard1 book={books[0]} />
                </div>
                <div className="col col-r s12 l4">
                  <PostCard1 book={books[1]} />
                </div>
                <div className="col col-r s12 l4">
                  <PostCard1 book={books[2]} />
                </div>
              </div>
            </div>

            {/* <div className="col col-r s12 l4">
              <PostCard2 post={posts[3]} />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
