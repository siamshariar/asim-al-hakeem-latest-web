import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  post: {
    postSlug = "/",
    imageSrc = "",
    catURL = "/",
    catText = "",
    postTitle = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-2 pc-2-2">
      <div className="card-image">
        <Link href={`/tafseer/${postSlug}`}>
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
        <Link href={catURL}>
          <a className="cat-r">{catText}</a>
        </Link>

        <Link href={`/tafseer/${postSlug}`}>
          <a className="heading-r">{postTitle}</a>
        </Link>
        <span className="date-r">{postDate}</span>
      </div>
    </div>
  );
}
