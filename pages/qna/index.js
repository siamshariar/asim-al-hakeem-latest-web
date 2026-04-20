import { useState } from "react";
import { server } from "../../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory, getQnaByLimit, getQnCatTitle } from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight, Search, FolderOpen, MessageCircle } from "lucide-react";

export default function QnaPage({ playlists, headerLectures, qnaCategories, qnaItems }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredQna = qnaItems?.filter(item => {
    const matchesSearch = item.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.cat_slug === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <>
      <Meta title="Q&A - Sheikh Assim Al Hakeem" description="Get answers to your Islamic questions from Sheikh Assim Al Hakeem" />
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-12 lg:py-16">
        <div className="container max-w-[1260px] mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <HelpCircle size={48} className="text-[#10b981] mx-auto mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Questions & Answers</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">Find authentic Islamic answers from Sheikh Assim Al Hakeem</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-[60px] lg:top-[70px] z-30">
        <div className="container max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative w-full lg:w-80">
              {/* <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
              <input type="text" placeholder="Search questions..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]" />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-thin">
              <button onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-0
                  ${selectedCategory === "all" ? "bg-[#10b981] text-white focus:bg-[#10b981]" : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-100"}`}>
                All Categories
              </button>
              {qnaCategories?.filter(c => c.slug !== "all").map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-0
                    ${selectedCategory === cat.slug ? "bg-[#10b981] text-white focus:bg-[#10b981]" : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:bg-gray-100"}`}>
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Q&A List */}
      <section className="py-12 lg:py-16 bg-gray-50 min-h-[60vh]">
        <div className="container max-w-[1000px] mx-auto px-4">
          {filteredQna.length > 0 ? (
            <div className="space-y-4">
              {filteredQna.map((item, idx) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <MessageCircle size={20} className="text-[#10b981] mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#1a1f2e] mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{item.answer}</p>
                      <Link href={`/qna/answer/${item.id}`} className="inline-flex items-center gap-1 text-[#10b981] text-sm font-medium mt-3 hover:gap-2 transition-all">
                        Read Full Answer <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FolderOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Ask Question CTA */}
      <section className="py-12 bg-gradient-to-r from-[#10b981] to-[#059669]">
        <div className="container max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Have a Question?</h2>
          <p className="text-white/90 mb-6">Submit your question to get guidance from Sheikh Assim Al Hakeem</p>
          <Link href="/ask-question">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-[#10b981] rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
              Ask a Question
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();
  const qnaItems = await getQnaByLimit(50);

  return {
    props: {
      playlists: playlists?.playlists || [],
      headerLectures: headerLectures || null,
      qnaCategories: qnaCategories || [],
      qnaItems: qnaItems || [],
    },
  };
}