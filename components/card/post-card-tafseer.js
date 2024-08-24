import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function PostCardTafseer({
  tafseer: {
    postSlug = "/",
    imageSrc = "",
    catURL = "/",
    catText = "",
    postTitle = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-2">
      <div className="card-image">
        <Link href={`/tafseer/${postSlug}`} className="image-r">

          <Image
            src={server + imageSrc}
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
        <span className="date-r">{postDate}</span>
      </div>
    </div>
  );
}
