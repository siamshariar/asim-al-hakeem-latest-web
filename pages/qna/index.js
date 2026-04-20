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
import Header2 from "../components/header1";
import { motion } from "framer-motion";
import { HelpCircle, Calendar, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import RecentLecturesEnhanced from "../components/home/recent-lectures-enhanced";
import FeaturedBooks from "../components/home/featured-books";

// Hero Banner Component
function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-[#1a1f2e] via-[#1a1f2e] to-[#2a3142] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#059669] rounded-full blur-3xl"></div>
      </div>
      <div className="container max-w-[1260px] mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1 bg-[#10b981]/20 text-[#10b981] rounded-full text-sm font-medium mb-4">
              Official Website
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Sheikh <span className="text-[#10b981]">Assim</span> Al Hakeem
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Authentic Islamic knowledge from one of the most trusted scholars. 
              Lectures, books, articles, Q&A, and counseling for Muslims worldwide.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/lectures/UUWsdcrre0WbCWML_PnuzoAg">
                <button className="px-6 py-3 bg-[#10b981] text-white rounded-full font-medium hover:bg-[#059669] transition-colors shadow-lg shadow-[#10b981]/25">
                  Watch Lectures
                </button>
              </Link>
              <Link href="/ask-question">
                <button className="px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                  Ask Question
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block">
            <img src="/img/profile-banner.png" alt="Sheikh Assim Al Hakeem" className="w-full object-contain" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "2M+", label: "Students" },
    { value: "5K+", label: "Lectures" },
    { value: "20+", label: "Books" },
    { value: "50K+", label: "Q&A" },
  ];
  return (
    <section className="py-12 bg-white">
      <div className="container max-w-[1260px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-3xl lg:text-4xl font-bold text-[#1a1f2e] mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container max-w-[1260px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-[#10b981] font-semibold uppercase tracking-wider text-sm">About Sheikh Assim</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1f2e] mt-2 mb-4">Guiding the Ummah with Authentic Knowledge</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Sheikh Assim bin Luqman al-Hakeem was born in 1962 in Al-Khobar, Saudi Arabia. 
              With decades of experience in Islamic scholarship and a unique ability to communicate 
              in both Arabic and English, he has become one of the most trusted voices in Islamic education.
            </p>
            <Link href="/about">
              <button className="px-6 py-3 bg-[#10b981] text-white rounded-full font-medium hover:bg-[#059669] transition-colors">Learn More</button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src="/img/about/about-img.jpg" alt="About Sheikh Assim" className="rounded-2xl shadow-xl w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Articles Section
function ArticlesSection({ articles }) {
  const displayArticles = articles?.slice(0, 3) || [];
  
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container max-w-[1260px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[#10b981] font-semibold uppercase tracking-wider text-sm">Insights & Knowledge</span>
            <h2 className="text-3xl font-bold text-[#1a1f2e] mt-2">Latest Articles</h2>
          </div>
          <Link href="/articles" className="text-[#10b981] font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        {displayArticles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {displayArticles.map((article, idx) => (
              <motion.article key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <Link href={`/articles/${article.postSlug}`}>
                  <img 
                    src={article.imageSrc || '/img/post/default.jpg'} 
                    alt={article.postTitle} 
                    className="w-full h-44 object-cover" 
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <CalendarIcon size={12} className="text-[#10b981]" />
                      <span>{article.postDate}</span>
                    </div>
                    <h3 className="font-bold text-[#1a1f2e] line-clamp-2 mb-2 hover:text-[#10b981] transition-colors">
                      {article.postTitle}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{article.postExcerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No articles available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Q&A and Counselling Section
function QACounsellingSection({ qna }) {
  const displayQna = qna?.slice(0, 3) || [];
  
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container max-w-[1260px] mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
              <HelpCircle size={24} className="text-[#10b981]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a1f2e] mb-4">Recent Q&A</h3>
            <div className="space-y-4 mb-6">
              {displayQna.length > 0 ? displayQna.map((item, idx) => (
                <Link key={idx} href={`/qna/answer/${item.id}`}>
                  <div className="border-b border-gray-100 pb-3 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
                    <p className="font-medium text-[#1a1f2e] line-clamp-1">{item.question}</p>
                    <p className="text-gray-500 text-sm line-clamp-1">{item.answer}</p>
                  </div>
                </Link>
              )) : (
                <p className="text-gray-500">No questions available.</p>
              )}
            </div>
            <Link href="/ask-question" className="inline-block px-6 py-3 bg-[#10b981] text-white rounded-full font-medium hover:bg-[#059669] transition-colors">
              Ask a Question
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] rounded-2xl shadow-lg p-8 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Counselling Sessions</h3>
            <p className="text-gray-300 mb-6">Need marriage counseling or personal guidance? Book a private session with Sheikh Assim.</p>
            <ul className="space-y-3 mb-6 text-gray-300">
              <li className="flex items-center gap-2"><span>✓</span> 30 Minute Session</li>
              <li className="flex items-center gap-2"><span>✓</span> Skype / FaceTime / Phone</li>
              <li className="flex items-center gap-2"><span>✓</span> $100 / Half Hour</li>
            </ul>
            <Link href="/counselling" className="inline-block px-6 py-3 bg-white text-[#1a1f2e] rounded-full font-medium hover:bg-gray-100 transition-colors">
              Book a Session
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#10b981] to-[#059669]">
      <div className="container max-w-[800px] mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-white/90 mb-6">Subscribe to receive notifications about new lectures and content</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3 rounded-xl text-[#1a1f2e] focus:outline-none" />
          <button className="px-6 py-3 bg-white text-[#10b981] rounded-xl font-medium hover:bg-gray-50 transition-colors">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export default function Home({ lectures, headerLectures, quotes, articles, playlists, books, qna, qna_categories }) {
  return (
    <>
      <Meta 
        title="Sheikh Assim Al Hakeem - Official Website" 
        description="Authentic Islamic knowledge from Sheikh Assim Al Hakeem"
      />
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qna_categories} />
      <main>
        <HeroBanner />
        <StatsSection />
        {/* Pass lectures data directly - no additional API call */}
        <RecentLecturesEnhanced lectures={lectures} />
        <AboutSection />
        <FeaturedBooks books={books} />
        <ArticlesSection articles={articles} />
        <QACounsellingSection qna={qna} />
        <NewsletterSection />
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [lectures, headerLectures, quotes, articles, playlistsData, books, qna, qna_categories] = await Promise.all([
      getHomeLectures().catch(() => ({ videoLists: [], videoStats: {} })),
      getHeaderLectures().catch(() => ({ videoLists: [], videoStats: {} })),
      getOptHomeQuotes().catch(() => []),
      getHomeArticles().catch(() => []),
      getAllPlaylists2().catch(() => ({ playlists: [], playlistsTitle: {} })),
      getHomeBooks().catch(() => []),
      getHomeQna().catch(() => []),
      getAllQnaCategory().catch(() => []),
    ]);
    
    return { 
      props: { 
        lectures, 
        headerLectures, 
        quotes, 
        articles, 
        playlists: playlistsData?.playlists || [], 
        books, 
        qna, 
        qna_categories 
      }, 
      revalidate: 60 
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { 
      props: { 
        lectures: { videoLists: [], videoStats: {} }, 
        headerLectures: { videoLists: [], videoStats: {} }, 
        quotes: [], 
        articles: [], 
        playlists: [], 
        books: [], 
        qna: [], 
        qna_categories: [] 
      }, 
      revalidate: 60 
    };
  }
}