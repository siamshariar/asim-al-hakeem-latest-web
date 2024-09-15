import React, { useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle'; // Import Swiper styles bundle

const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      quote: 'The life of this world is merely enjoyment of delusion',
      name: 'Quran 3:185',
    },
    {
      id: 2,
      quote: 'Indeed, the patient will be given their reward without account',
      name: 'Quran 39:10',
    },
    {
      id: 3,
      quote: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me',
      name: 'Quran 02:152',
    },
  ];

  // Initialize Swiper using useEffect after the component is fully mounted
  useEffect(() => {
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
      new Swiper(swiperElement, {
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <section className="testimonials bg-testimonials bg-cover bg-right bg-no-repeat py-12">
      <div className="testimonial__container container mx-auto">
        <div className="flex flex-col items-center gap-x-14 xl:flex-row w-full">
          <div className="hidden xl:flex">
            <img src="/img/quran.png" alt="Quran" />
          </div>

          <div className="max-w-[98%] xl:max-w-[710px]">
            <div className="swiper h-[400px]">
              <div className="swiper-wrapper">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="swiper-slide">
                    <div className="h-full flex flex-col justify-center items-start">
                      <div className="max-w-[680px] mx-auto text-center xl:text-left">
                        <p
                          id={`quote-${testimonial.id}`}
                          className="font-light relative text-[34px] text-[#777F81] leading-[190%] text-center xl:text-left mb-7"
                        >
                          {/* Image Before Quote */}
                          <img
                            src="/img/bg/quote-left.svg" // Replace with your image path
                            alt="Quote Icon Left"
                            className="inline-block mb-3 w-10 h-6"
                          />

                          <span className="mx-2">{testimonial.quote}</span>

                          {/* Image After Quote */}
                          <img
                            src="/img/bg/quote-right.svg" // Replace with your image path
                            alt="Quote Icon Right"
                            className="inline-block mb-3 w-8 h-6"
                          />
                        </p>
                        <div className="text-[32px] text-[#4c5354] font-semibold">{testimonial.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
