import { server } from "../../lib/config";
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
      <div className="card card-r pc-2">
          <div className="card-image card-image-b">
              <Link href={`/books/${bookSlug}`}>
                  <a className="image-r">
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

          <div className="card-content">
              {/* <Link href={catURL}>
          <a className="cat-r">{catText}</a>
        </Link> */}

              <Link href={`/books/${bookSlug}`}>
                  <a className="heading-r">{bookName}</a>
              </Link>

              {/*<p>{postExcerpt}</p>*/}

              <span className="date-r">{bookText}</span>
          </div>
      </div>
  );
}
