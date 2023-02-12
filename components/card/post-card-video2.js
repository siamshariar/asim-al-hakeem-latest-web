import { server } from "../../lib/config";
import Link from "next/link";
import Image from "next/image";
import { date } from "../../lib/format";

export default function PostCardVideo2({ item, statistics }) {
  const id = item.id;
  const image = item.image;
  const title = item.title;
  const publishedAt = date(item.date);
  const viewCount = statistics ? statistics[id] : "";

  return (
    <div className="card card-r pc-video">
      <div className="card-image">
        {/*TODO: Consider prefetch*/}
        <Link href={`/lectures/watch/${id}`}>
          <a className="image-r">
            {/* <img src={image} alt="" /> */}
            <Image
              src={
                image
                  ? `http://i.ytimg.com/vi/${id}/mqdefault.jpg`
                  : `${server}/img/post/youtube-default.jpg`
              }
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
        <Link href={`/lectures/watch/${id}`}>
          <a className="heading-r">{title}</a>
        </Link>

        <div className="data-line">
          <span className="view-r">{viewCount} views</span>
          <span className="date-r">{publishedAt}</span>
        </div>
      </div>
    </div>
  );
}
