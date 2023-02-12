import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function PostCardArticle({
  article: {
    postSlug = "/", //
    postTitle = "",
    imageSrc = "",
    postExcerpt = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-0">
      <div className="card-image">
        <Link href={`/organizations/${postSlug}`}>
          <a className="image-r">
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
        <Link href={`/articles/${postSlug}`}>
          <a className="heading-r">{postTitle}</a>
        </Link>

        {/*<p className="paragraph-r">{postExcerpt}</p>*/}
      </div>
    </div>
  );
}
