import { server } from "../../../lib/config";
import Link from "next/link";
import Meta from "../../../components/meta";
import parse from "html-react-parser";
import Share from "../../../components/share";
import {
	getAllPlaylists2,
	getAnsById,
	getHeaderLectures,
	getQnaByLimit,
} from "../../../lib/fetch";
import Header from "../../../components/header";

export default function BlogDetail({ ans, playlists, headerLectures }) {
	return (
		<>
			<Meta
				title={ans[0].qn}
				description={ans[0].qn}
				url={`${server}/questions/ans/${ans[0].id}`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header playlists={playlists.playlists} lectures={headerLectures} />

			{/* <section className="blog-detail-top">
				<div className="page-width">
					<div className="box">
						<Link href={`/articles/${detail.postSlug}`}>
							<a className="heading-r">
								{detail.postTitle}
							</a>
						</Link>
					</div>
				</div>
			</section> */}

			<section className="blog-detail-ctn">
				<div className="page-width">
					<div className="box">
						<div className="blog-area">
							<div className="blog-detail">
								<div className="qna-qn">Qustion: {ans[0].id}</div>
								<h3 className="qna-qn">{ans[0].qn}</h3>
							</div>
							<hr className="qna-hr" />
							<div className="blog-detail">
								<p>{ans[0].ans}</p>
							</div>

							<div className="blog-action">
								{/*<div className="blog-tag">*/}
								{/*	<h2>ট্যাগ</h2>*/}

								{/*	<Link href="/articless/">*/}
								{/*		<a>#কুরআন</a>*/}
								{/*	</Link>*/}
								{/*	<Link href="/articless/">*/}
								{/*		<a>#হাদিস</a>*/}
								{/*	</Link>*/}
								{/*</div>*/}

								<div className="blog-share">
									<Share
										urlWeb={`/questions/ans/${ans[0].id}`}
										urlMobile={`/questions/ans/${ans[0].id}`}
										title="প্রশ্নোত্তর"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/*<section className="blog-page-related">*/}
			{/*	<div className="page-width">*/}
			{/*		<div className="box">*/}
			{/*			<h1 className="title-r">*/}
			{/*				<span>সম্পর্কিত পোস্ট</span>*/}
			{/*			</h1>*/}

			{/*			<div className="row row-r">*/}
			{/*			{*/}
			{/*				articles && articles.length && articles.map(article =>*/}
			{/*					<div className="col col-r s12 xl4" key={article.id}>*/}
			{/*						<PostCardArticle article={article} />*/}
			{/*					</div>*/}
			{/*				)*/}
			{/*			}*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
		</>
	);
}

export async function getStaticProps({ params }) {
	const id = params.id;
	// const slug = params.id.split("=");
	// const id = slug[0];

	const ans = await getAnsById(id);
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();

	return {
		props: {
			ans,
			playlists,
			headerLectures,
		},
	};
}

export async function getStaticPaths() {
	const ans = await getQnaByLimit(50);

	const paths = ans.map((item) => ({
		params: {
			id: item.id.toString(),
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
}
