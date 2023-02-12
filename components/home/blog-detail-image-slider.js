import Image from "next/image";
import Slider from "react-slick";
import { server } from "../../lib/config";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function BlogDetailImageSlider({ images }) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
    dots: false,
    draggable: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    cssEase: "ease",
    centerMode: true,
    mobileFirst: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "130px",
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          centerPadding: "87px",
          arrows: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          centerPadding: "47px",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="recent-slider-outer">
      <div className="recent-slider-inner">
        <Slider className="recent-slider" {...settings}>
          {images &&
            images.map((image, i) => (
              <div className="image-item" key={i}>
                <div className="image-ctn">
                  <Image
                    src={
                      image && image !== ""
                        ? `${server}/${image}`
                        : `${server}/img/post/youtube-default.jpg`
                    }
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center center"
                    loading="eager" unoptimized
                  />
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

const Prev = (props) => {
  return (
    <span className="recent-prev" onClick={props.onClick}>
      <KeyboardArrowLeftIcon />
    </span>
  );
};

const Next = (props) => {
  return (
    <span className="recent-next" onClick={props.onClick}>
      <KeyboardArrowRightIcon />
    </span>
  );
};
