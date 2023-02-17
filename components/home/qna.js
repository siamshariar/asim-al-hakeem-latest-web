import PostCardQna from "../card/post-card-qna";
import HomeSection from "./home-section";

export default function HomeQna({ qna }) {
	return (
		<section className="h-sec h3-post-1">
			<HomeSection title="QnA" link="/questions">
				<div className="row row-r">
					<div className="col col-r s12 l12">
						<div className="h3-post-left">
							<div className="row row-r">
								{qna &&
									qna.length &&
									qna.map((item) => (
										<div className="col col-r s12 m4" key={item.id}>
											<PostCardQna qna={item} />
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</HomeSection>
		</section>
	);
}
