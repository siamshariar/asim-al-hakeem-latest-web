import { server } from "../../lib/config";
import { getBooks, getBookDetails, getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../lib/fetch";
import Image from "next/image";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import Share from "../../components/share";
import { motion } from "framer-motion";
import { BookOpen, Download, ShoppingCart, FileText, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookDetail({ detail, playlists, headerLectures, qnaCategories }) {
  if (!detail) {
    return (
      <>
        <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />
        <div className="container max-w-[1260px] mx-auto px-4 py-16 sm:py-20 text-center">
          <BookOpen size={40} className="sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold text-[#1a1f2e] mb-2">Book Not Found</h1>
          <Link href="/books" className="text-[#10b981] hover:underline text-sm sm:text-base">Back to Books</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta title={detail.bookName} url={`${server}/books/${detail.bookSlug}`} image={detail.imageSrc}
        description={detail.bookExcerpt || "Islamic book by Sheikh Assim Al Hakeem"} type="website" />

      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />

      <section className="py-6 sm:py-8 lg:py-10 bg-gray-50">
        <div className="container max-w-[1260px] mx-auto px-4">
          <Link href="/books" className="inline-flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-[#10b981] mb-4 sm:mb-6 transition-colors text-sm sm:text-base">
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> Back to Books
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Book Image */}
              <div className="bg-gradient-to-br from-[#10b981]/10 to-[#10b981]/5 p-5 sm:p-8 lg:p-10 flex items-center justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                  <Image src={detail.imageSrc || "/img/books/default.jpg"} alt={detail.bookName} fill
                    className="object-cover rounded-2xl sm:rounded-3xl" />
                </div>
              </div>

              {/* Book Details */}
              <div className="p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#10b981] mb-2 sm:mb-3">
                  <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">Book</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1f2e] mb-3 sm:mb-4">{detail.bookName}</h1>
                
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-4 sm:mb-6">
                  <User size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base font-medium">{detail.writer || "Sheikh Assim Al Hakeem"}</span>
                </div>

                {detail.translator && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    <span>Translator:</span>
                    <span className="font-medium">{detail.translator}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {detail.link && (
                    <a href={detail.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#10b981] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#059669] transition-colors shadow-lg shadow-[#10b981]/25">
                      <Download size={16} className="sm:w-[18px] sm:h-[18px]" /> Download
                    </a>
                  )}
                  {detail.purchaseLink && (
                    <a href={detail.purchaseLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1a1f2e] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#2a3142] transition-colors">
                      <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" /> Buy Now
                    </a>
                  )}
                  {detail.pdf && (
                    <a href={`${server}/pdf-viewer/web/viewer.html?file=${detail.pdf}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-[#10b981] text-[#10b981] rounded-lg text-sm sm:text-base font-medium hover:bg-[#10b981] hover:text-white transition-all">
                      <FileText size={16} className="sm:w-[18px] sm:h-[18px]" /> Read Online
                    </a>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-5 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#1a1f2e] mb-2 sm:mb-3">About this Book</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{detail.bookDesc || detail.bookExcerpt}</p>
                </div>

                {/* Share */}
                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Share this book</p>
                  <Share urlWeb={`books/${detail.bookSlug}`} urlMobile={detail.bookSlug} title={detail.bookName} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const detail = await getBookDetails(slug);
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      detail: detail || null,
      playlists: playlists?.playlists || [],
      headerLectures: headerLectures || null,
      qnaCategories: qnaCategories || [],
    },
  };
}

export async function getStaticPaths() {
  const books = await getBooks();
  const paths = books?.map((book) => ({ params: { slug: book.bookSlug } })) || [];
  return { paths, fallback: false };
}