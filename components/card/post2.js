import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  post: {
    postSlug = "/",
    imageSrc = "",
    catURL = "/",
    catText = "",
    postTitle = "",
    postExcerpt = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-0">
      <div className="card-image">
        <Link href={`/tafseer/${postSlug}`} className="image-r">

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
        <Link href={catURL} className="cat-r">
          {catText}
        </Link>

        <Link href={`/tafseer/${postSlug}`} className="heading-r">
          {postTitle}
        </Link>

        <p>{postExcerpt}</p>

        <span className="date-r">{postDate}</span>
      </div>
    </div>
  );
}
