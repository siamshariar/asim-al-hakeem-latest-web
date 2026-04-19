import { useState, useEffect, useRef } from 'react';
import { server } from "../lib/config";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../lib/fetch";
import Meta from "../components/meta";
import Header2 from "../components/header1";
import { motion } from "framer-motion";
import { Mail, Send, Calendar, Clock, User, Phone, DollarSign, Heart, Share2, CheckCircle } from 'lucide-react';

export default function CounsellingSession({ playlists, headerLectures, qna_categories }) {
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleFocusDate = () => {
      if (dateInputRef.current) {
        dateInputRef.current.showPicker?.();
      }
    };
    const handleFocusTime = () => {
      if (timeInputRef.current) {
        timeInputRef.current.showPicker?.();
      }
    };
    const dateInput = dateInputRef.current;
    const timeInput = timeInputRef.current;
    if (dateInput) dateInput.addEventListener('focus', handleFocusDate);
    if (timeInput) timeInput.addEventListener('focus', handleFocusTime);
    return () => {
      if (dateInput) dateInput.removeEventListener('focus', handleFocusDate);
      if (timeInput) timeInput.removeEventListener('focus', handleFocusTime);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.fullname.trim()) newErrors.fullname = 'Name is required';
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formValues.date) newErrors.date = 'Date is required';
    if (!formValues.time) newErrors.time = 'Time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formValues);
    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 5000);
  };

  const shareUrl = `${server}/counselling`;

  return (
    <>
      <Meta
        title="Counselling Session - Sheikh Assim Al Hakeem"
        description="Book a one-to-one live counseling session with Sheikh Assim Al-Hakeem for marriage counseling, personal guidance, and Islamic advice."
        image={`${server}/img/id/default_share.jpeg`}
        url={`${server}/counselling`}
        type="website"
      />

      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qna_categories} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1f2e] to-[#2a3142] py-12 lg:py-16">
        <div className="container max-w-[1260px] mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Calendar size={48} className="text-[#10b981] mx-auto mb-4" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Counselling Session</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              One-to-one Live Counseling with Sheikh Assim Al-Hakeem via Skype, FaceTime, or Phone Call
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container max-w-[1260px] mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* About Session */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                  <User size={24} className="text-[#10b981]" />
                </div>
                <h2 className="text-xl font-bold text-[#1a1f2e] mb-3">About the Session</h2>
                <p className="text-gray-600 leading-relaxed">
                  Need Marriage Counseling? Or any other one-to-one Live Counseling with Sheikh Assim Al-Hakeem? 
                  Get personalized Islamic guidance from one of the most trusted scholars.
                </p>
              </motion.div>

              {/* Session Details */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} className="text-[#10b981]" />
                </div>
                <h2 className="text-xl font-bold text-[#1a1f2e] mb-3">Session Details</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-[#10b981]" />
                    <span>Duration: 30 Minutes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign size={16} className="text-[#10b981]" />
                    <span>Fee: $100 / Half Hour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#10b981]" />
                    <span>Flexible Scheduling</span>
                  </li>
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6">
                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} className="text-[#10b981]" />
                </div>
                <h2 className="text-xl font-bold text-[#1a1f2e] mb-3">Contact</h2>
                <a href="mailto:sheikhassim.bookings@gmail.com" 
                  className="text-[#10b981] hover:underline break-all">
                  sheikhassim.bookings@gmail.com
                </a>
              </motion.div>

              {/* Donation Card */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={24} className="text-white" />
                  <h2 className="text-xl font-bold">Donate for the Needy</h2>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Help a brother/sister in need who cannot afford counseling for marital issues, OCD, Waswas, and more.
                </p>
                <div className="bg-white/10 rounded-lg p-3 text-sm space-y-1">
                  <p className="font-medium">Assim Lugman Alhakeem</p>
                  <p>A/c: 164128664188</p>
                  <p>Maybank Investment Berhad</p>
                  <p>Bangsar, KL Malaysia</p>
                  <p>Swift: MBBEMYKLXXX</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1f2e] mb-6">Book Your Session</h2>
                
                {submissionSuccess && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                    <CheckCircle size={20} />
                    <span>Your booking request has been submitted! We'll contact you shortly.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" name="fullname" value={formValues.fullname} onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all
                            ${errors.fullname ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#10b981]/20 focus:border-[#10b981]'}`}
                          placeholder="Your full name" />
                      </div>
                      {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" name="email" value={formValues.email} onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all
                            ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#10b981]/20 focus:border-[#10b981]'}`}
                          placeholder="your@email.com" />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" name="phone" value={formValues.phone} onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]"
                        placeholder="+966 XX XXX XXXX" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="date" name="date" ref={dateInputRef} value={formValues.date} onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all cursor-pointer
                            ${errors.date ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#10b981]/20 focus:border-[#10b981]'}`} />
                      </div>
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="time" name="time" ref={timeInputRef} value={formValues.time} onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all cursor-pointer
                            ${errors.time ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#10b981]/20 focus:border-[#10b981]'}`} />
                      </div>
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea name="message" value={formValues.message} onChange={handleChange} rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] resize-none"
                      placeholder="Briefly describe what you'd like to discuss..." />
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-xl font-medium shadow-lg shadow-[#10b981]/25 hover:shadow-xl hover:shadow-[#10b981]/30 transition-all flex items-center justify-center gap-2">
                    <Send size={18} />
                    <span>Submit Booking Request</span>
                  </motion.button>
                </form>

                {/* Share Section */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Share this page</p>
                  <div className="flex gap-3">
                    <button onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="p-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </button>
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="p-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(shareUrl)}
                      className="p-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-colors">
                      <Share2 size={20} />
                    </button>
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

export async function getStaticProps() {
  try {
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
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        playlists: [],
        headerLectures: [],
        qna_categories: [],
      },
    };
  }
}