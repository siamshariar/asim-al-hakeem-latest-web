import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from 'next/router';
import '../styles/QuranSlider.module.scss';
import { verses } from '../data/verses';

const QuranSlider = () => {
  const router = useRouter();
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const handleButtonClick = (id) => {
    console.log(`Navigating to verse with id: ${id}`);
    router.push(`/verse-details/${id}`);
  };

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
    fade: false,
    beforeChange: (current, next) => setCurrentSlide(next), 
  };

  return (
    <section className="quran-slider">
      <div className="page-width">
        <div className="box">
          <div className="opt_home_quote_slider_wrap">
            <Slider ref={sliderRef} {...settings}>
              {verses.map((verse, index) => (
                <div key={verse.id} className="slide">
                  <div className="slider-container">
                    <div className="slider-image">
                      <img src={verse.image} alt={verse.word} />
                    </div>
                    <div className="slider-content">
                      <h1>{verse.word}</h1>
                      <p>{verse.verse}</p>
                      <button 
                        className="announcement-btn" 
                        onClick={() => handleButtonClick(verse.id)}
                      >
                        See tafseer...
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="opt_slider_arrow opt_home_quote_slider_arrow">
              <button
                className="opt_slider_prev"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <KeyboardArrowLeft />
              </button>
              <button
                className="opt_slider_next"
                onClick={() => sliderRef.current?.slickNext()}
              >
                <KeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuranSlider;
