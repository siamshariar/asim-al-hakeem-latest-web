import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, User, Star, ArrowRight } from "lucide-react";

export default function FeaturedBooks({ books }) {
  const featuredBooks = books?.slice(0, 4) || [];

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

  if (!featuredBooks.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container max-w-[1260px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">Knowledge Library</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mt-2 mb-4">Featured Islamic Books</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore authentic Islamic literature to deepen your understanding of the Deen
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {featuredBooks.slice(0, 2).map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <Link href={`/books/${book.bookSlug}`}>
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 bg-gradient-to-br from-accent/10 to-accent/5 p-6">
                    <div className="relative h-48 sm:h-full">
                      <Image
                        src={book.imageSrc || "/img/books/default.jpg"}
                        alt={book.bookName}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="sm:w-2/3 p-6">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <BookOpen size={16} />
                      <span className="text-xs font-medium uppercase tracking-wider">Featured Book</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {book.bookName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <User size={14} />
                      <span>{book.writer}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {book.bookExcerpt}
                    </p>
                    <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {featuredBooks.length > 2 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featuredBooks.slice(2).map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <Link href={`/books/${book.bookSlug}`}>
                  <div className="relative h-40 bg-gradient-to-br from-accent/5 to-transparent p-4">
                    <Image
                      src={book.imageSrc || "/img/books/default.jpg"}
                      alt={book.bookName}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-primary text-sm line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                      {book.bookName}
                    </h4>
                    <p className="text-gray-500 text-xs">{book.writer}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/books">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-accent text-white rounded-full font-medium shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all"
            >
              Browse All Books
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}