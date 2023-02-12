import { server } from "../../lib/config";
import { date as dateFormat } from "../../lib/format";
import Link from "next/link";
import Image from "next/image";

export default function PostCardRecent({
  recent: {
    image = "",
    //catURL = "/",
    //catText = "",
    id = "/",
    title = "",
    date = "",
  },
} = {}) {
  return (
    <div className="recent-item">
      <Link href={`/lectures/watch/${id}`}>
        <div className="recent-ctn">
          {/* <img src={image} alt="" /> */}
          <Image
            //src={image}
            src={
              image && image !== ""
                ? `http://i.ytimg.com/vi/${id}/mqdefault.jpg`
                : `${server}/img/post/youtube-default.jpg`
            }
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            loading="eager" unoptimized
          />
          <div className="recent-text">
            <a className="heading-r">{title}</a>
            <span className="date-r">{dateFormat(date)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
