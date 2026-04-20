import { useRouter } from 'next/router';
import { server } from "../../../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory, getAnsById } from "../../../lib/fetch";
import Meta from "../../../components/meta";
import Header2 from "../../../components/header1";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Share2, Calendar, Folder, ChevronRight } from "lucide-react";
import { qna, qnCat } from "../../../data/qna";

export default function QnaAnswerDetail({ answer, playlists, headerLectures, qnaCategories }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!answer) {
    return (
      <>
        <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />
        <section className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#1a1f2e] mb-2">Answer Not Found</h1>
            <p className="text-gray-500 mb-6">The answer you're looking for doesn't exist or has been removed.</p>
            <Link href="/qna" className="inline-block px-6 py-3 bg-[#10b981] text-white rounded-full font-medium hover:bg-[#059669] transition-colors">
              Back to Q&A
            </Link>
          </div>
        </section>
      </>
    );
  }

  const category = qnCat.find(cat => cat.slug === answer.cat_slug);
  const shareUrl = `${server}/qna/answer/${answer.id}`;

  const relatedQuestions = qna
    .filter(q => q.cat_slug === answer.cat_slug && q.id !== answer.id)
    .slice(0, 3);

  return (
    <>
      <Meta
        title={`${answer.question} - Sheikh Assim Al Hakeem`}
        description={answer.answer.substring(0, 160) + '...'}
        url={shareUrl}
        type="article"
      />

      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-10 lg:py-14">
        <div className="container max-w-[1000px] mx-auto px-4">
          <Link href="/qna" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Back to Q&A
          </Link>
          {category && (
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link href="/qna" className="text-gray-400 hover:text-white">Q&A</Link>
              <ChevronRight size={14} className="text-gray-500" />
              <Link href={`/qna/${category.slug}`} className="text-[#10b981] hover:text-[#34d399]">{category.title}</Link>
            </div>
          )}
          <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-bold text-white leading-tight">
            {answer.question}
          </motion.h1>
        </div>
      </section>

      {/* Answer Content */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container max-w-[1000px] mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 lg:p-8">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Folder size={14} className="text-[#10b981]" />
                      {category?.title || 'General'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-[#10b981]" />
                      Answered by Sheikh Assim
                    </span>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#10b981]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageCircle size={16} className="text-[#10b981]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[#1a1f2e] mb-2">Question:</h2>
                        <p className="text-gray-700 leading-relaxed">{answer.question}</p>
                      </div>
                    </div>
                  </div>

                  {/* Answer */}
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#059669] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">A</span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-[#1a1f2e] mb-2">Answer:</h2>
                        <div className="prose prose-lg max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{answer.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Share this answer</p>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                        className="p-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(answer.question)}`, '_blank')}
                        className="p-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => navigator.clipboard.writeText(shareUrl)}
                        className="p-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="space-y-6">
                
                {/* Related Questions */}
                {relatedQuestions.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Related Questions</h3>
                    <div className="space-y-3">
                      {relatedQuestions.map((q) => (
                        <Link key={q.id} href={`/qna/answer/${q.id}`}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                          <p className="text-sm text-[#1a1f2e] group-hover:text-[#10b981] line-clamp-2 transition-colors">
                            {q.question}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ask Question CTA */}
                <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-white text-lg font-bold mb-2">Have a Question?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Submit your question to get authentic Islamic guidance from Sheikh Assim Al Hakeem.
                  </p>
                  <Link href="/ask-question"
                    className="inline-block w-full text-center py-2.5 bg-white text-[#10b981] rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Ask a Question
                  </Link>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#1a1f2e] mb-4">Categories</h3>
                  <div className="space-y-2">
                    {qnCat.slice(0, 5).map((cat) => (
                      <Link key={cat.id} href={`/qna/${cat.slug}`}
                        className={`block p-2 rounded-lg text-sm transition-colors ${
                          cat.slug === answer.cat_slug 
                            ? 'bg-[#10b981]/10 text-[#10b981] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#10b981]'
                        }`}>
                        {cat.title}
                      </Link>
                    ))}
                    <Link href="/qna"
                      className="block p-2 rounded-lg text-sm text-[#10b981] font-medium hover:bg-[#10b981]/5 transition-colors">
                      View All Categories →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  const answer = qna.find(item => item.id === parseInt(id)) || null;
  
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      answer,
      playlists: playlists?.playlists || [],
      headerLectures: headerLectures || null,
      qnaCategories: qnaCategories || [],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = qna.map(item => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}