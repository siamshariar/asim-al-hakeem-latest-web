import {
	getHomeLectures,
	getOptHomeQuotes,
	getHomeArticles,
	getAllPlaylists2,
	getHomeBooks,
	getHomeQna,
	getHeaderLectures,
	getAllQnaCategory,
} from "../lib/fetch";

import Meta from "../components/meta";
import Header from "../components/header";
import HomeRecent from "../components/home/recent";
// import HomeQuoteSlider from "../components/home2/quote-slider";
// import HomeBookList from "../components/home2/books";
// import HomeOrganizations from "../components/home/organizations";
import HomeBanner from "../components/home/banner";
import HomeArticles from "../components/home/articles";
// import HomePostList2 from "../components/home/post-list2";
import HomeBooks from "../components/home/books";
// import HomePostList4 from "../components/home/post-list4";
// import HomeBookList from "../components/home/books";
// import HomeFeatured from "../components/home2/featured";
import { server } from "../lib/config";
import HomeQna from "../components/home/qna";
import TextContent from "../components/home/text-content";
import HomeQuoteSlider from "../components/home/quote-slider";

export default function Home({
	lectures,
	headerLectures,
	quotes,
	articles,
	playlists,
	books,
	qna,
	qna_categories,
}) {
	return (
		<>
			<Meta
				title=""
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				url={`${server}/contact`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header
				playlists={playlists}
				lectures={headerLectures}
				qna_categories={qna_categories}
			/>

			<div className="opt_home_ctn">
				<HomeBanner />
				<HomeRecent lectures={lectures} />
				<HomeArticles articles={articles} />
				<HomeBooks books={books} />
				<HomeQna qna={qna} />
				<TextContent />
				<HomeQuoteSlider quotes={quotes} />
			</div>
		</>
	);
}

export async function getStaticProps(context) {
	// const blogs = await getOptHomeBlogs();
	const lectures = await getHomeLectures();
	const headerLectures = await getHeaderLectures();
	const quotes = await getOptHomeQuotes();
	// const books = await getOptHomeBooks();
	// const organizations = await getHomeOrganizations();
	const articles = await getHomeArticles();
	const qna = await getHomeQna();
	// const articles = await getArticles()
	// const papers = await getHomePapers();
	// playlists & playlistsTitle
	const playlists = await getAllPlaylists2();
	// const posts4 = await getHome3Posts4();
	// const organizations2 = await getHomeOrganizations();
	const books = await getHomeBooks();
	const qna_categories = await getAllQnaCategory();

	return {
		props: {
			lectures,
			headerLectures,
			quotes,
			articles,
			playlists: playlists.playlists,
			books,
			qna,
			qna_categories,
		},
	};
}
