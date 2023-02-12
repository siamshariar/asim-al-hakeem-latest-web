import { server } from "../../lib/config";
import {
  getBooks,
  getBookDetails,
  getRelatedBooks,
  getAllPlaylists2,
} from "../../lib/fetch";
import Image from "next/image";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import Share from "../../components/share";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function BookDetail({ detail, books, playlists }) {
  return (
    <>
      <Meta
        title={`${detail.bookName} | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah`}
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/books/${detail.bookSlug}`}
        image={server + detail.imageSrc}
        type="article"
      />

      <Header playlists={playlists} />

      <section className="blog-detail-ctn">
        <div className="page-width">
          <div className="box">
            <div className="blog-area">
              <div className="blog-detail book-detail">
                <div className="row margin-bottom-0">
                  <div className="col s12 l5">
                    <div className="book-detail-left-wrapper">
                      <div className="book-detail-left">
                        <div className="book-detail-left-inner">
                          <Image
                            src={server + detail.imageSrc}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center center"
                            loading="eager" unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col s12 l7">
                    <div className="book-detail-right">
                      <h2 className="book-title">{detail.bookName}</h2>

                      {/*<div className="book-writer-area">*/}
                      {/*	<p>লেখক: <i>{detail.writer}</i></p>*/}
                      {/*	/!*<p>অনুবাদ: <i>{detail.translator}</i></p>*!/*/}
                      {/*	/!*<p>সম্পাদনা: <i>{detail.editor}</i></p>*!/*/}
                      {/*</div>*/}

                      <div className="book-action">
                        <div className="book-btn">
                          {detail.link != "" && (
                            <a
                              className="btn-r read-more"
                              target="_blank"
                              href={`${detail.link}`}
                            >
                              <MenuBookIcon />
                              <span>পড়ুন</span>
                            </a>
                          )}

                          {detail.purchaseLink != "" && (
                            <a
                              className="btn-r read-more"
                              target="_blank"
                              href={`${detail.purchaseLink}`}
                            >
                              <MenuBookIcon />
                              <span>ক্রয় করতে</span>
                            </a>
                          )}

                          {detail.pdf != "" && (
                            <a
                              className="btn-r read-more"
                              target="_blank"
                              href={`${server}/pdf-viewer/web/viewer.html?file=${detail.pdf}`}
                            >
                              <MenuBookIcon />
                              <span>পড়ুন</span>
                            </a>
                          )}

                          {detail.link == "" && detail.purchaseLink == "" && detail.pdf == "" && (
                          	<span className="no-link">{detail.linkNotAvailableText}...</span>
                          )}
                        </div>

                        <div className="blog-share book-share">
                          <Share
                            urlWeb={`books/${detail.bookSlug}`}
                            urlMobile={detail.bookSlug}
                            title={detail.bookName}
                          />
                        </div>
                      </div>

                      <p className="book-detail-desc">{detail.bookDesc}</p>
                    </div>
                  </div>
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
      {/*				books && books.length && books.map(books =>*/}
      {/*					<div className="col col-r s12 l6 xl4" key={books.id}>*/}
      {/*						<BookCard books={books} />*/}
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
  //const resRelated = await fetch(`${server}/api/books/related`)
  //const books = await resRelated.json()

  const slug = params.slug;
  const detail = await getBookDetails(slug);
  const books = await getRelatedBooks();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      detail,
      books,
      playlists: playlists.playlists,
    },
  };
}

export async function getStaticPaths() {
  //const res = await fetch(`${server}/api/books/listpage`)
  //const books = await res.json()

  const books = await getBooks();

  const paths = books.map((book) => ({
    params: { slug: book.bookSlug },
  }));

  return {
    paths,
    fallback: false,
  };
}
