import { server } from "../lib/config";
import Image from "next/image";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../lib/fetch";
import Meta from "../components/meta";
import Header2 from "../components/header1";
import { motion } from "framer-motion";
import { Mail, DollarSign, Clock, AlertCircle, Share2, Send, User, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function AskAQuestion({ playlists, headerLectures, qna_categories }) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Question submitted:', formValues);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormValues({ name: '', email: '', question: '' });
  };

  const shareUrl = `${server}/ask-question`;

  return (
    <>
      <Meta
        title="Ask a Question - Sheikh Assim Al Hakeem"
        description="Submit your Islamic questions to Sheikh Assim bin Luqman al-Hakeem for authentic guidance and answers."
        image={`${server}/img/id/default_share.jpeg`}
        url={`${server}/ask-question`}
        type="website"
      />

      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qna_categories} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-12 lg:py-16">
        <div className="container max-w-[1260px] mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HelpCircle size={48} className="text-[#10b981] mx-auto mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Ask a Question</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Submit your Islamic questions for authentic guidance from Sheikh Assim Al Hakeem
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container max-w-[1260px] mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Timing Notice */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 mb-2">Important Notice</p>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Assalamu alaikum wa rahmatullahi wa barakatuhu,<br /><br />
                      Our NEW TIMING for taking questions is from <strong>6 P.M (Makkah Time)</strong> until the quota finishes.<br /><br />
                      Saturday is our day off.<br /><br />
                      Jazakum Allahu Khairan<br />
                      (ADMIN)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Counselling Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-[#1a1f2e] mb-3">Counselling Sessions</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Need marriage counseling or one-to-one live counseling via Skype, FaceTime with Sheikh Assim?
                </p>
                <div className="space-y-2 text-sm">
                  <a href="mailto:sheikhassim.bookings@gmail.com" className="flex items-center gap-2 text-[#10b981] hover:underline">
                    <Mail size={16} />
                    sheikhassim.bookings@gmail.com
                  </a>
                  <p className="flex items-center gap-2 text-gray-700">
                    <DollarSign size={16} className="text-[#10b981]" />
                    $100 / Half Hour
                  </p>
                </div>
              </motion.div>

              {/* Donation Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl shadow-md p-6 text-white">
                <h3 className="text-white text-lg font-bold mb-3">Donate for the Needy</h3>
                <p className="text-white/90 text-sm mb-4">
                  Help a brother/sister in need who cannot afford counseling for marital issues.
                </p>
                <div className="bg-white/10 rounded-lg p-3 text-sm space-y-1">
                  <p>Assim Lugman Alhakeem</p>
                  <p>A/c: 164128664188</p>
                  <p>Maybank Investment Berhad</p>
                  <p>Bangsar, KL Malaysia</p>
                  <p>Swift: MBBEMYKLXXX</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-[#1a1f2e] mb-6">Submit Your Question</h2>

                {submitted && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                    Your question has been submitted successfully!
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" name="name" value={formValues.name} onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]"
                          placeholder="Your name" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" name="email" value={formValues.email} onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]"
                          placeholder="your@email.com" required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                    <textarea name="question" value={formValues.question} onChange={handleChange} rows="6"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] resize-none"
                      placeholder="Type your question here..." required />
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-medium shadow-lg shadow-[#10b981]/25 hover:shadow-xl hover:shadow-[#10b981]/30 transition-all flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>Submit Question</span>
                  </motion.button>
                </form>

                {/* Share Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Share this page</p>
                  <button onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="inline-flex items-center gap-2 text-[#10b981] hover:text-[#059669] transition-colors">
                    <Share2 size={18} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qna_categories = await getAllQnaCategory();

  return {
    props: {
      playlists: playlists?.playlists || [],
      headerLectures: headerLectures || [],
      qna_categories: qna_categories || [],
    },
  };
}