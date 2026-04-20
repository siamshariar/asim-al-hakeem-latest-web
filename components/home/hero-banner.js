import { motion } from "framer-motion";
import Link from "next/link";
import { PlayCircle, BookOpen, HelpCircle } from "lucide-react";

export default function HeroBanner() {
    const stats = [
        { value: "2M+", label: "Students" },
        { value: "5K+", label: "Lectures" },
        { value: "20+", label: "Books" },
        { value: "50K+", label: "Q&A" },
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#1a1f2e] via-[#1a1f2e] to-[#2a3142] overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-80 sm:w-96 h-80 sm:h-96 bg-[#10b981]/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 bg-[#059669]/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container max-w-[1260px] mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] sm:min-h-[650px] lg:min-h-[700px] py-12 lg:py-0">
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-[#10b981]/10 rounded-full text-[#10b981] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                        >
                            Official Website
                        </motion.div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                            Sheikh{" "}
                            <span className="text-[#10b981]">Assim</span>
                            <br className="hidden sm:block" />
                            Al Hakeem
                        </h1>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Authentic Islamic knowledge from one of the most trusted scholars. 
                            Lectures, books, articles, Q&A, and counseling for Muslims worldwide.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                            <Link href="/lectures/UUWsdcrre0WbCWML_PnuzoAg">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#10b981] text-white rounded-full text-sm sm:text-base font-medium shadow-lg shadow-[#10b981]/25 hover:shadow-xl hover:shadow-[#10b981]/30 transition-all"
                                >
                                    <PlayCircle size={18} className="sm:w-5 sm:h-5" />
                                    <span>Watch Lectures</span>
                                </motion.button>
                            </Link>
                            <Link href="/books">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm sm:text-base font-medium hover:bg-white/20 transition-all"
                                >
                                    <BookOpen size={18} className="sm:w-5 sm:h-5" />
                                    <span>Explore Books</span>
                                </motion.button>
                            </Link>
                            <Link href="/ask-question">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-sm sm:text-base font-medium hover:bg-white/20 transition-all"
                                >
                                    <HelpCircle size={18} className="sm:w-5 sm:h-5" />
                                    <span>Ask Question</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-8 sm:mt-12 max-w-md mx-auto lg:mx-0">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Image - Hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                            >
                                <img 
                                    src="/img/profile-banner.png" 
                                    alt="Sheikh Assim Al Hakeem" 
                                    className="w-full object-contain"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent z-20" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}