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
            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
        >
            <Link href={`/books/${bookSlug}`} className="flex flex-col h-full">
                {/* Book Cover - Full image without background */}
                <div className="relative w-full pt-[140%] overflow-hidden bg-gray-50">
                    <Image
                        src={imageSrc}
                        alt={bookName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                
                {/* Book Details */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#10b981] mb-2">
                        <BookOpen size={14} />
                        <span className="text-xs font-medium uppercase tracking-wider">Book</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#1a1f2e] mb-1 line-clamp-2 group-hover:text-[#10b981] transition-colors">
                        {bookName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <User size={14} />
                        <span>{writer}</span>
                    </div>
                    {bookExcerpt && (
                        <p className="text-gray-600 text-xs line-clamp-2 mt-auto">
                            {bookExcerpt}
                        </p>
                    )}
                    <div className="flex items-center text-[#10b981] font-medium text-xs mt-3 group-hover:gap-2 transition-all">
                        <span>View Details</span>
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}