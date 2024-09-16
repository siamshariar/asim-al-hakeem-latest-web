import React, { useEffect } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { useRouter } from 'next/router';
import Meta from "../../components/meta";
import Header2 from "../../components/header1";

const TeamSlider = ({ playlists, headerLectures, qnaCategories }) => {
  const router = useRouter();
  const isTeamSliderPage = router.pathname === '/book'; // Detect if it's the book page

  const teamMembers = [
    {
      id: 1,
      name: 'Asim Al Hakeem',
      position: 'Pediatrician',
      image: '/img/books/book-1.jpg',
      description: 'Dolor sit amet, consectetur adipiscing elit.',
      width: 100,
      height: 100,
    },
    {
      id: 2,
      name: 'Asim Al Hakeem',
      position: 'Cardiologist',
      image: '/img/books/book-2.jpg',
      description: 'Dolor sit amet, consectetur adipiscing elit.',
      width: 250,
      height: 350,
    },
    {
      id: 3,
      name: 'Dr. Isabella Davies',
      position: 'Gynecologist',
      image: '/img/books/book-3.jpg',
      description: 'Dolor sit amet, consectetur adipiscing elit.',
      width: 200,
      height: 300,
    },
    {
      id: 4,
      name: 'Dr. John Doe',
      position: 'Neurologist',
      image: '/img/books/book-4.jpg',
      description: 'Dolor sit amet, consectetur adipiscing elit.',
      width: 250,
      height: 350,
    },
  ];

  useEffect(() => {
    // Initialize Swiper after the component is mounted
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
      },
    });

    // Clean up Swiper instance on unmount
    return () => {
      swiper?.destroy(true, true);
    };
  }, [router.pathname]); // Re-initialize Swiper on route change

  return (
    <>
      <Meta
        title="Team Slider"
        description="Meet our team members"
        url="/team-slider"
        image="/img/default_share.jpeg"
        type="website"
      />

      {isTeamSliderPage && (
        <Header2
          playlists={playlists}
          lectures={headerLectures}
          qna_categories={qnaCategories}
        />
      )}

      <section className="team pb-100 py-12 section pb-[100px]">
        <div className="container mx-auto">
          <h2 className="team__title text-4xl font-bold mb-[50px] text-center xl:text-left">Books</h2>
          <div className="team__slider swiper min-h-[500px]">
            <div className="swiper-wrapper">
              {teamMembers.map((member, index) => {
                if (index % 2 === 0) {
                  return (
                    <div key={index} className="swiper-slide">
                      <div className="flex flex-col md:flex-row gap-9">
                        <div className="flex-1 flex flex-col xl:flex-row items-center gap-[30px]">
                          <div className="flex-1">
                            <img
                              src={teamMembers[index].image}
                              alt={teamMembers[index].name}
                              className="w-full h-auto rounded-lg"
                              width={teamMembers[index].width || 'auto'}
                              height={teamMembers[index].height || 'auto'}
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <h4 className="h4 text-[#4C5354] font-bold text-2xl mb-[8px]">
                              {teamMembers[index].name}
                            </h4>
                            <div className="text-[#9AB4B7] text-[22px] mb-[12px] max-w-[320px]">
                              {teamMembers[index].position}
                            </div>
                            <p className="font-light text-[#777F81] text-[20px] mb-[26px] max-w-[320px]">
                              {teamMembers[index].description}
                            </p>
                            <div className="flex items-center text-[30px] gap-x-5 text-accent-tertiary">
                              <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                <i className="ri-youtube-fill"></i>
                              </a>
                              <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                <i className="ri-facebook-circle-fill"></i>
                              </a>
                              <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                <i className="ri-instagram-fill"></i>
                              </a>
                              <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                <i className="ri-pinterest-fill"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        {teamMembers[index + 1] && (
                          <div className="flex-1 flex flex-col xl:flex-row items-center gap-[30px]">
                            <div className="flex-1">
                              <img
                                src={teamMembers[index + 1].image}
                                alt={teamMembers[index + 1].name}
                                className="w-full h-auto rounded-lg"
                                width={teamMembers[index + 1].width || 'auto'}
                                height={teamMembers[index + 1].height || 'auto'}
                              />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <h4 className="h4 text-[#4C5354] font-bold text-2xl mb-[8px]">
                                {teamMembers[index + 1].name}
                              </h4>
                              <div className="text-[#9AB4B7] text-[22px] mb-[12px] max-w-[320px]">
                                {teamMembers[index + 1].position}
                              </div>
                              <p className="font-light text-[#777F81] text-[20px] mb-[26px] max-w-[320px]">
                                {teamMembers[index + 1].description}
                              </p>
                              <div className="flex items-center text-[30px] gap-x-5 text-accent-tertiary">
                                <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                  <i className="ri-youtube-fill"></i>
                                </a>
                                <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                  <i className="ri-facebook-circle-fill"></i>
                                </a>
                                <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                  <i className="ri-instagram-fill"></i>
                                </a>
                                <a href="#" className="cursor-pointer hover:text-accent transition-all">
                                  <i className="ri-pinterest-fill"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="swiper-pagination mt-[10px]"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamSlider;
