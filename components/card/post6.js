import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  organization: {
    orgSlug = "/",
    imageSrc = "",
    // catURL = "/",
    // catText = "",
    orgName = "",
    orgExcerpt = "",
    // postDate = "",
  },
} = {}) {
  return (
    <div className="card card-r pc-6">
      <div className="card-image">
        <Link href={`/organizations/${orgSlug}`} className="image-r">

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

        <Link href={`/organizations/${orgSlug}`} className="heading-r">
          {orgName}
        </Link>

        <p>{orgExcerpt}</p>

        {/* <span className="date-r">{postDate}</span> */}
      </div>
    </div>
  );
}
