import { server } from "../../lib/config";
import {
	getBooks,
	getAllPlaylists2,
	getHeaderLectures,
	getAllQnaCategory,
} from "../../lib/fetch";
import Meta from "../../components/meta";
import Header from "../../components/header";
// import BookCard from "../../components/card/post-card-book";
import PostCard from "../../components/card/post-card-tertiary";
import Header2 from "../../components/header1";

export default function BookList({
	books,
	playlists,
	headerLectures,
	qnaCategories,
}) {
	return (
		<>
			<Meta
				title="Books"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				url={`${server}/books`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header2
				playlists={playlists}
				lectures={headerLectures}
				qna_categories={qnaCategories}
			/>

			<section className="cat-page-top">
				<div className="page-width">
					<div className="box mt-10">
						<h1>Books</h1>
					</div>
				</div>
			</section>

			<section className="books">
				<div className="page-width">
					<div className="box">
						<div className="row row-r">
							{books &&
								books.length &&
								books.map((book) => (
									<div className="col col-r s12 l6" key={book.id}>
										{/* <BookCard book={book} /> */}
										<PostCard book={book} />
									</div>
								))}
						</div>
						{/*<p style={{ marginBottom: "30px" }}>*/}
						{/*  আরও দেখুন:{" "}*/}
						{/*  <a*/}
						{/*    href="https://islamhouse.com/bn/author/25506/books/showall/1"*/}
						{/*    target="_blank"*/}
						{/*  >*/}
						{/*    https://islamhouse.com/bn/author/25506/books/showall/1*/}
						{/*  </a>*/}
						{/*</p>*/}
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps(context) {
	const books = await getBooks();
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();
	const qnaCategories = await getAllQnaCategory();

	return {
		props: {
			books,
			playlists: playlists.playlists,
			headerLectures,
			qnaCategories,
		},
	};
}
