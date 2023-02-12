import PostCardPaper from "../card/post-card-paper";
import SectionHeader from "../section-header";

export default function HomePapers({ papers }) {
  return (
    <section className="h-sec home-page-papers">
      <div className="page-width">
        <div className="box">
          <SectionHeader //
            title="রিসার্চ পেপারস"
            link="/research-papers/"
          />

          <div className="row row-r">
            {papers &&
              papers.length &&
              papers.map((paper) => (
                <div className="col col-r s12 xl4" key={paper.id}>
                  <PostCardPaper paper={paper} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
