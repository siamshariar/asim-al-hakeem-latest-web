import { useRef } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import QuoteSliderCard from "../card/quote1";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

export default function HomeQuoteSlider({ quotes }) {
  const slider = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
    draggable: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    cssEase: "ease",
    mobileFirst: false,
    fade: true,
  };

  return (
    <section className="h-sec opt_home_quote">
      <div className="page-width">
        <div className="box">
          <div className="opt_home_quote_slider_wrap">
            <Slider
              className="opt_home_quote_slider"
              {...settings}
              ref={slider}
            >
              {quotes &&
                quotes.length &&
                quotes.map((quote) => (
                  <QuoteSliderCard key={quote.id} quote={quote} />
                ))}
            </Slider>

            <div className="opt_slider_arrow opt_home_quote_slider_arrow">
              <button
                className="opt_slider_prev"
                onClick={() => slider.current.slickPrev()}
              >
                <KeyboardArrowLeft />
              </button>
              <button
                className="opt_slider_next"
                onClick={() => slider.current.slickNext()}
              >
                <KeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
