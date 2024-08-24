import Link from "next/link";
import Image from "next/image";

export default function PostCard({
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
        <Link href={`/books/${bookSlug}`} className="image-r">

          <Image
            src={imageSrc}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            loading="eager" unoptimized
          />

        </Link>
      </div>

      <div className="card-content">
        {/* <Link href={catURL}>
          <a className="cat-r">{catText}</a>
        </Link> */}

        <Link href={`/books/${bookSlug}`} className="heading-r">
          {bookName}
        </Link>

        {/*<p>{postExcerpt}</p>*/}

        <span className="date-r">{bookText}</span>
      </div>
    </div>
  );
}
