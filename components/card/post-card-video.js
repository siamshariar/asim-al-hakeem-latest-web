import Link from "next/link";
import { date } from "../../lib/format";

export default function PostCardVideo({ lecture, statistics }) {
  const id = lecture.id;
  const image = lecture.image;
  const title = lecture.title;
  const viewCount = statistics ? statistics.statistics.viewCount : "";
  const publishedAt = date(lecture.date);

  return (
    <div className="card card-r pc-0">
      <div className="card-image">
        <Link href={`/lectures?v=${id}`}>
          <a className="image-r">
            <img src={image} alt="" />
          </a>
        </Link>
      </div>

      <div className="card-content">
        <Link href={`/lectures?v=${id}`}>
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
