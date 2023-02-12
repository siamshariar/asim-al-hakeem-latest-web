import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";

export default function PostCardOrganization({
  organization: {
    id = "", //
    orgName = "",
    imageSrc = "",
    orgExcerpt = "",
    orgSlug = "/",
  },
} = {}) {
  return (
      <div className="card card-r pc-0">
        <div className="card-image">
          <Link href={`/organizations/${orgSlug}`}>
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
          <Link href={`/articles/${orgSlug}`}>
            <a className="heading-r">{orgName}</a>
          </Link>

          {/*<p className="paragraph-r">{postExcerpt}</p>*/}
        </div>
      </div>
  );
}
