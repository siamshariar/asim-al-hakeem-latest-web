import PostCard from "../card/post6";

export default function HomeOrganizations({ organizations }) {
  return (
    <section className="h-sec h3-post-5">
      <div className="page-width">
        <div className="box">
          <h2 className="h3-sec-title-2">অর্গানাইজেশনস</h2>

          <div className="row row-r">
            <div className="col col-r s12 l6">
              <PostCard organization={organizations[0]} />
            </div>
            <div className="col col-r s12 l6">
              <PostCard organization={organizations[1]} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h3-bg-pattern"></div> */}
    </section>
  );
}
