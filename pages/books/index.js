import { server } from "../../lib/config";
import { getBooks, getAllPlaylists2, getHeaderLectures } from "../../lib/fetch";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import BookCard from "../../components/card/post-card-book";
import Pagination from "../../components/pagination";

export default function BookList({ books, playlists, headerLectures }) {
	return (
		<>
			<Meta
				title="Books"
				description="Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia. He was raised there until the age of 12 before he and his family moved to the Western Province of Saudi Arabia"
				url={`${server}/books`}
				image={`${server}/img/id/default_share.jpeg`}
				type="website"
			/>

			<Header playlists={playlists} lectures={headerLectures} />

			<section className="cat-page-top">
				<div className="page-width">
					<div className="box">
						<h1>
							বই সমূহ
							{/*<span>১২</span>*/}
						</h1>
						{/*<p>আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিল অভ্র নামক এক যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।</p>*/}
					</div>
				</div>
			</section>

			<section className="cat-page-books">
				<div className="page-width">
					<div className="box">
						<div className="row row-r">
							{books &&
								books.length &&
								books.map((book) => (
									<div className="col col-r s12 l4" key={book.id}>
										<BookCard book={book} />
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

			{/*<Pagination />*/}
		</>
	);
}

export async function getStaticProps(context) {
	//const res = await fetch(`${server}/api/books/listpage`)
	//const books = await res.json()

	const books = await getBooks();
	const playlists = await getAllPlaylists2();
	const headerLectures = await getHeaderLectures();

	return {
		props: {
			books,
			playlists: playlists.playlists,
			headerLectures,
		},
	};
}
