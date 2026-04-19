import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight, MessageCircle } from "lucide-react";

export default function QASection({ qna }) {
  const recentQuestions = qna?.slice(0, 4) || [];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 lg:p-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
          <HelpCircle size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">Recent Q&A</h3>
          <p className="text-gray-600 text-sm">Answers from Sheikh Assim</p>
        </div>
      </div>

      {recentQuestions.length > 0 ? (
        <div className="space-y-4 mb-8">
          {recentQuestions.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <MessageCircle size={18} className="text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-primary font-medium mb-2 line-clamp-2">
                    {item.question || item.title}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.answer || item.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center mb-8">
          <MessageCircle size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Submit your question to get guidance from Sheikh Assim</p>
        </div>
      )}

      <Link href="/ask-question">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-accent text-white rounded-xl font-medium shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all flex items-center justify-center gap-2"
        >
          <span>Ask a Question</span>
          <ChevronRight size={18} />
        </motion.button>
      </Link>
    </motion.div>
  );
}