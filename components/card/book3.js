import Link from "next/link";
import Image from "next/image";

export default function BookCard({
  book: {
    bookSlug = "/", //
    imageSrc = "",
    bookName = "",
    bookText = "",
  },
} = {}) {
  return (
    <div className="books-item bc-3">
      <div className="books-image">
        <Link href={`/books/${bookSlug}`}>
          <a>
            <Image
              src={imageSrc}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center center"
              loading="eager" unoptimized
            />
          </a>
        </Link>
      </div>

      <div className="books-detail">
        <Link href={`/books/${bookSlug}`}>
          <a className="books-name">{bookName}</a>
        </Link>

        <p className="books-text">{bookText}</p>
      </div>
    </div>
  );
}
