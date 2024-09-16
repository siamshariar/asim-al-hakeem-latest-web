import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function BookCard({
  book: {
    bookSlug = "/", // Default URL slug for the book
    imageSrc = "/img/books/default-book.jpg", // Default image if none is provided
    bookName = "Untitled Book", // Default title if none is provided
    bookText = "No description available", // Default text if none is provided
  },
} = {}) {
  return (
    <div className="card card-r pc-2">
      {/* Card Image */}
      <div className="card-image card-image-b">
        <Link href={`/books/${bookSlug}`}>
          <a className="image-r">
            <Image
              src={imageSrc}
              alt={bookName}
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              loading="eager"
              unoptimized // You can optimize images depending on your requirement
            />
          </a>
        </Link>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Book Title */}
        <Link href={`/books/${bookSlug}`}>
          <a className="heading-r">{bookName}</a>
        </Link>

        {/* Description/Book Text */}
        <span className="date-r">{bookText}</span>
      </div>
    </div>
  );
}
