import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function PostCardLecture({
  lecture: {
    postID = "/",
    imageSrc = "",
    postTitle = "",
    postExcerpt = "",
    postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-0">
      <div className="card-image">
        <Link href={`/lectures/${postID}`}>
          <a className="image-r">
            {/* <img src={imageSrc} alt="" /> */}
            <Image
              src={server + imageSrc}
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
        <Link href={`/lectures/${postID}`}>
          <a className="heading-r">{postTitle}</a>
        </Link>

        <p className="paragraph-r">{postExcerpt}</p>
        <span className="date-r">{postDate}</span>
      </div>
    </div>
  );
}
