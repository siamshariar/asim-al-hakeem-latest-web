import { server } from "../../lib/config";
import {
	getArticles,
	getAllPlaylists2,
	getHeaderLectures,
	getAllQnaCategory,
} from "../../lib/fetch";
import Meta from "../../components/meta";
import Header from "../../components/header";
import PostCardArticle from "../../components/card/post-card-article";
// import PostCardArticle2 from "../../components/card/post-card-article2";

export default function BlogList({
	articles,
	playlists,
	headerLectures,
	qnaCategories,
}) {
	return (
		<>
			<Meta
				title="Articles"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				url={`${server}/articles`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header
				playlists={playlists}
				lectures={headerLectures}
				qna_categories={qnaCategories}
			/>

			<section className="cat-page-top">
				<div className="page-width">
					<div className="box">
						<h1>
							Articles
							{/*<span>৯</span>*/}
						</h1>
					</div>
				</div>
			</section>

			<section className="cat-page-articles">
				<div className="page-width">
					<div className="box">
						<div className="row row-r">
							{articles &&
								articles.length &&
								articles.map((article) => (
									<div className="col col-r s12 m6 l6 xl4" key={article.id}>
										<PostCardArticle article={article} />
									</div>
								))}
						</div>
						{/*<p style={{ margin: "10px 0 30px 0" }}>*/}
						{/*  আরও দেখুন:{" "}*/}
						{/*  <a*/}
						{/*    href="https://islamhouse.com/bn/author/25506/articles/showall/1"*/}
						{/*    target="_blank"*/}
						{/*  >*/}
						{/*    https://islamhouse.com/bn/author/25506/articles/showall/1*/}
						{/*  </a>*/}
						{/*</p>*/}
					</div>
				</div>
			</section>

			{/*<section className="cat-page-articles">*/}
			{/*		<div className="page-width">*/}
			{/*			<div className="box">*/}
			{/*				<div className="row row-r">*/}
			{/*				{*/}
			{/*					articles && articles.length && articles.map(article =>*/}
			{/*						<div className="col col-r s12 xl4" key={article.id}>*/}
			{/*							<PostCardArticle2 article={article} />*/}
			{/*						</div>*/}
			{/*					)*/}
			{/*				}*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</section>*/}

			{/*<Pagination />*/}
		</>
	);
}

export async function getStaticProps(context) {
	//const res = await fetch(`${server}/api/articles/listpage`)
	//const articles = await res.json()

	const articles = await getArticles();
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();
	const qnaCategories = await getAllQnaCategory();

	return {
		props: {
			articles,
			playlists: playlists.playlists,
			headerLectures,
			qnaCategories,
		},
	};
}
