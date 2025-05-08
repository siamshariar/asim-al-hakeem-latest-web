import React from "react";
import Link from "next/link";

const Banner2 = () => {
  return (
    <section className="bg-[#F4F4F4] py-12 px-6 xl:pt-12 xl:pb-0 overflow-hidden">
      <div className="container mx-auto flex pt-[0px] flex-col-reverse lg:flex-row items-center  py-8 lg:py-10">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">

          <div className="xl:w-[80%] text-center xl:text-left">
            
            <h1 className="h1 mb-6">Sheikh Assim Alhakeem</h1>
            <p className="mb-[42px] mb-6 mt-4 text-2xl text-[#A07F81] md:max-w-xl">
              Sheikh Assim bin Luqman al-Hakeem was born in 1962 in the city of
              Al-Khobar, which lies in the east of the Kingdom of Saudi Arabia.
              He was raised there until the age of 12 before he and his family
              moved to the Western Province of Saudi Arabia, to the city of
              Jeddah.
            </p>
            <Link href="/about" passHref>
              <button className="btn btn-lg btn-accent text-xl mx-auto xl:mx-0">
                SEE MORE
              </button>
            </Link>

          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0">
          <img
            src="/img/profile-banner.png"
            alt="Doctor"
            className="w-4/4 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
