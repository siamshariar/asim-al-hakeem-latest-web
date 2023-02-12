import Link from "next/link";
import Image from "next/image";

const SlideCard = ({
  slide: {
    postSlug = "/", //
    imageSrc = "",
    postTitle = "",
    postDate = "",
  },
} = {}) => {
  return (
    <div className="slc-1">
      <Image
        src={imageSrc}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        loading="eager" unoptimized
      />

      <div className="slc-layer">
        <span className="date-r">অফিসিয়াল ওয়েবসাইট</span>
        <a>ড. আবু বকর মুহাম্মাদ যাকারিয়া</a>
      </div>
    </div>
  );
};

export default SlideCard;
