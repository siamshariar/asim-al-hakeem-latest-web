import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, User, ArrowRight } from "lucide-react";

export default function BookCardEnhanced({ book }) {
    const {
        bookName = "Untitled",
        imageSrc = "/img/books/default.jpg",
        bookSlug = "#",
        bookExcerpt = "",
        writer = "Sheikh Assim Al Hakeem",
    } = book;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            <Link href={`/books/${bookSlug}`}>
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                    <Image
                        src={imageSrc}
                        alt={bookName}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                    <div className="flex items-center gap-2 text-accent mb-3">
                        <BookOpen size={16} />
                        <span className="text-xs font-medium uppercase tracking-wider">Book</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {bookName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <User size={14} />
                        <span>{writer}</span>
                    </div>
                    {bookExcerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {bookExcerpt}
                        </p>
                    )}
                    <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Read More</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}