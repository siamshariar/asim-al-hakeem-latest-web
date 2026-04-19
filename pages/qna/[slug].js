import { useState } from "react";
import { server } from "../../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory, getQnaByLimit, getQnCatTitle } from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ChevronRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function QnaCategoryPage({ playlists, headerLectures, qnaCategories, qnaItems, categoryTitle }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Meta title={`${categoryTitle} - Q&A`} description={`Islamic Q&A on ${categoryTitle}`} />
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />

      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-10 lg:py-14">
        <div className="container max-w-[1260px] mx-auto px-4">
          <Link href="/qna" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={18} /> Back to Q&A
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">{categoryTitle}</h1>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50 min-h-[60vh]">
        <div className="container max-w-[1000px] mx-auto px-4">
          {qnaItems?.length > 0 ? (
            <div className="space-y-4">
              {qnaItems.map((item, idx) => (
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
              <p className="text-gray-500">No questions found in this category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();
  const allQna = await getQnaByLimit(200);
  const qnaItems = allQna?.filter(item => item.cat_slug === slug) || [];
  const categoryTitle = await getQnCatTitle(slug);

  return {
    props: {
      playlists: playlists?.playlists || [],
      headerLectures: headerLectures || null,
      qnaCategories: qnaCategories || [],
      qnaItems,
      categoryTitle: categoryTitle || slug,
    },
  };
}

export async function getStaticPaths() {
  const qnaCategories = await getAllQnaCategory();
  const paths = qnaCategories?.filter(c => c.slug !== "all").map(cat => ({
    params: { slug: cat.slug },
  })) || [];

  return { paths, fallback: false };
}