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
import { BookOpen, Search, Filter, X } from "lucide-react";
import { useState, useMemo } from "react";
import BookCardEnhanced from "../../components/card/book-card-enhanced";

export default function BookList({
    books,
    playlists,
    headerLectures,
    qnaCategories,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

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

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

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
            <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary py-16 lg:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary rounded-full blur-3xl"></div>
                </div>
                <div className="container max-w-[1260px] mx-auto relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen size={40} className="text-accent" />
                        </div>
                        <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">Islamic Books</h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">
                            Authentic Islamic literature to deepen your understanding of the Deen
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30">
                <div className="container max-w-[1260px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full lg:w-96">
                            {/* <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
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

                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Filter size={18} />
                                <span>Filters</span>
                            </button>
                            
                            <div className={`lg:flex gap-3 ${showFilters ? 'flex' : 'hidden'} flex-wrap`}>
                                <select
                                    value={selectedAuthor}
                                    onChange={(e) => setSelectedAuthor(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
                                >
                                    {authors.map(author => (
                                        <option key={author} value={author}>
                                            {author === "all" ? "All Authors" : author}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-gray-500 text-sm whitespace-nowrap">
                                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Books Grid */}
            <section className="py-12 lg:py-16 bg-gray-50">
                <div className="container max-w-[1260px] mx-auto">
                    {filteredBooks.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredBooks.map((book) => (
                                <motion.div key={book.id} variants={fadeInUp}>
                                    <BookCardEnhanced book={book} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-gradient-to-r from-accent to-accent-secondary">
                <div className="container max-w-[800px] mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                        <p className="text-white/90 mb-8 text-lg">
                            Subscribe to receive notifications about new books and publications
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button className="px-6 py-3 bg-white text-accent rounded-xl font-medium hover:bg-gray-50 transition-colors">
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
            playlists: playlists.playlists,
            headerLectures,
            qnaCategories,
        },
    };
}