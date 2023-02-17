import SectionHeader from "../section-header";
import PostCard1 from "../card/post1";
import Link from "next/link";
import HomeSection from "./home-section";

// import PostCard2 from "../card/post2";

export default function HomeBooks({ books }) {
	return (
		<section className="h-sec h3-post-3">
			<HomeSection title={"Books"} link="/books">
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
				</div>
			</HomeSection>
		</section>
	);
}
