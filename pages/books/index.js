import { server } from "../../lib/config";
import { getBooks, getAllPlaylists2 } from "../../lib/fetch";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import BookCard from "../../components/card/post-card-book";
import Pagination from "../../components/pagination";

export default function BookList({ books, playlists }) {
  return (
    <>
      <Meta
        title="বই সমূহ | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah"
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/books`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

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

  return {
    props: {
      books,
      playlists: playlists.playlists,
    },
  };
}
