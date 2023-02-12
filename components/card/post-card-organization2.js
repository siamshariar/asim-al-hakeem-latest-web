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
    <div className="recent-item">
      <Link href={`/organizations/${orgSlug}`}>
        <div className="recent-ctn">
          <Image
            src={
              imageSrc && imageSrc !== ""
                ? `${server}/${imageSrc}`
                : `${server}/img/post/youtube-default.jpg`
            }
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            loading="eager" unoptimized
          />
          <div className="recent-text">
            <a className="heading-r">{orgName}</a>
          </div>
        </div>
      </Link>
    </div>
  );
}
