import { server } from "../../lib/config";
import {
    getBooks,
    getAllPlaylists2,
    getHeaderLectures,
    getAllQnaCategory,
} from "../../lib/fetch";
import Meta from "../../components/meta";
import Header2 from "../../components/header1";
import { motion } from "framer-motion";
import { BookOpen, Search, X, User, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// Book Card Component - Full Image Left, Content Right
function BookCard({ book }) {
    const { bookName, imageSrc, bookSlug, bookExcerpt, writer } = book;
    
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
        >
            <Link href={`/books/${bookSlug}`} className="flex flex-row h-full">
                {/* Left Side - Full Cover Image (No padding, No background, No gap) */}
                <div className="w-2/5 relative overflow-hidden flex-shrink-0">
                    <Image
                        src={imageSrc || "/img/books/default.jpg"}
                        alt={bookName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 250px"
                    />
                </div>
                
                {/* Right Side - Content with padding */}
                <div className="w-3/5 p-4 lg:p-5 flex flex-col bg-white">
                    <div className="flex items-center gap-1.5 text-[#10b981] mb-2">
                        <BookOpen size={14} />
                        <span className="text-xs font-medium uppercase tracking-wider">Book</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-[#1a1f2e] mb-1 group-hover:text-[#10b981] transition-colors line-clamp-2">
                        {bookName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs lg:text-sm mb-2">
                        <User size={14} />
                        <span>{writer}</span>
                    </div>
                    {bookExcerpt && (
                        <p className="text-gray-600 text-xs lg:text-sm line-clamp-3 mb-3">
                            {bookExcerpt}
                        </p>
                    )}
                    <div className="flex items-center text-[#10b981] font-medium text-xs lg:text-sm group-hover:gap-2 transition-all mt-auto">
                        <span>View Details</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function BookList({
    books,
    playlists,
    headerLectures,
    qnaCategories,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("all");

    const authors = useMemo(() => {
        const uniqueAuthors = [...new Set(books.map(book => book.writer))];
        return ["all", ...uniqueAuthors];
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch = book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 book.bookExcerpt?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAuthor = selectedAuthor === "all" || book.writer === selectedAuthor;
            return matchesSearch && matchesAuthor;
        });
    }, [books, searchTerm, selectedAuthor]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Calculate dynamic min height based on content
    const cardMinHeight = "h-auto";

    return (
        <>
            <Meta
                title="Islamic Books by Sheikh Assim Al Hakeem"
                description="Explore a collection of authentic Islamic books written by Sheikh Assim bin Luqman al-Hakeem covering various topics of Islamic knowledge."
                url={`${server}/books`}
                image={`${server}/img/id/default_share.jpeg`}
                type="website"
            />

            <Header2
                playlists={playlists}
                lectures={headerLectures}
                qna_categories={qnaCategories}
            />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#1a1f2e] via-[#1a1f2e] to-[#2a3142] py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#10b981] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#059669] rounded-full blur-3xl"></div>
                </div>
                <div className="container max-w-[1260px] mx-auto px-4 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen size={40} className="text-[#10b981]" />
                        </div>
                        <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">Islamic Books</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Authentic Islamic literature to deepen your understanding of the Deen
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-6 bg-white border-b border-gray-100 sticky top-[60px] lg:top-[70px] z-30">
                <div className="container max-w-[1260px] mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-96">
                            {/* <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-[#1a1f2e]"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* <div className="flex items-center gap-3 w-full lg:w-auto">
                            <select
                                value={selectedAuthor}
                                onChange={(e) => setSelectedAuthor(e.target.value)}
                                className="px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] bg-white"
                            >
                                {authors.map(author => (
                                    <option key={author} value={author}>
                                        {author === "all" ? "All Authors" : author}
                                    </option>
                                ))}
                            </select>

                            <div className="text-gray-500 text-sm whitespace-nowrap">
                                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Books Grid */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="container max-w-[1260px] mx-auto px-4">
                    {filteredBooks.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid md:grid-cols-2 gap-5 lg:gap-6"
                        >
                            {filteredBooks.map((book) => (
                                <motion.div key={book.id} variants={itemVariants} className={cardMinHeight}>
                                    <BookCard book={book} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-gradient-to-r from-[#10b981] to-[#059669]">
                <div className="container max-w-[800px] mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-white text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-white/90 mb-8 text-lg">
                            Subscribe to receive notifications about new books and publications
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-5 py-3 rounded-xl text-white bg-white/10 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="px-6 py-3 bg-white text-[#10b981] rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps(context) {
    const books = await getBooks();
    const playlists = await getAllPlaylists2();
    const headerLectures = await getHeaderLectures();
    const qnaCategories = await getAllQnaCategory();

    return {
        props: {
            books,
            playlists: playlists?.playlists || [],
            headerLectures: headerLectures || null,
            qnaCategories: qnaCategories || [],
        },
    };
}