import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  post: {
    postSlug = "/", //
    imageSrc = "",
    postTitle = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-4">
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

        <div className="card-content">
          <Link href={`/tafseer/${postSlug}`}>
            <a className="heading-r">{postTitle}</a>
          </Link>

          <span className="date-r">{postDate}</span>
        </div>
      </div>
    </div>
  );
}
