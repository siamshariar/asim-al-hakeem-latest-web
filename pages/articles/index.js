import React from 'react';

const Articles = () => {
  const lectures = [
    {
      id: 1,
      date: "Jan 2, 2023",
      title: "গণমাধ্যমে দা‘ওয়াতঃসমস্যা ও সমাধান",
      description:
        "আল-কুরআনুল কারীম মহানবী সাল্লাল্লাহু ‘আলাইহি ওয়াসাল্লামের উপর আল্লাহ সুবহানাহু ওয়া তা‘আলার পক্ষ থেকে নাযিলকৃত সর্বশ্রেষ্ঠ ও চিরন্তন মু‘জিযা, বিশ্ব মানবতার মুক্তিসনদ। এতে রয়েছে মানব জীবনের সকল...",
      imageUrl: "/img/post/001.jpg",
    },
    {
      id: 2,
      date: "Jan 3, 2023",
      title: "আসহাবে রাসূলের (ﷺ) উপাধি ও সম্মানজনক লকব সমূহ",
      description:
        "মুমিন মাত্রই রাসূলুল্লাহ সাল্লাল্লাহু ‘আলাইহি ওয়াসাল্লামের প্রতি মহব্বত পোষণ করে। কেননা রাসূলুল্লাহ সাল্লাল্লাহু ‘আলাইহি ওয়াসাল্লামের প্রতি মহব্বত রাখা ঈমানের এক অপরিহার্য অংশ। পরম শ্রদ্ধা, গভীর ভালোবাসা আর...",
      imageUrl:"/img/post/002.jpg",
    },
    {
      id: 3,
      date: "Jan 4, 2023",
      title: "উশর ও খারাজের বিধান",
      description:
        "একটা সুষম, কল্যাণমুখী ও সর্বাত্মক ব্যবস্থা ছাড়া মানুষের পক্ষে সুস্থ স্বাভাবিক সমাজ-জীবন যাপন করা কোনমতেই সম্ভবপর নয়। এজন্যই আল্লাহ সুবহানাহু ওয়া তা‘আলা মানবজাতির প্রতি রহমত স্বরূপ নাযিল করেছেন এক মহান শরী‘আহ তথা সার্বিক আইন ও বিধান...",
      imageUrl: "/img/post/005.jpg",
    },
  ];

  return (
    <section className='airticles py-[120px]'>
      <div className='container mx-auto'>
        <h2 className='blog__title h2 mb-[50px] text-center xl:text-left'>Articles</h2>

        <div className='flex flex-col xl:flex-row gap-y-6 xl:gap-y-0 items-center xl:justify-between mb-[50px]'>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/01.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>Sep 5, 2024</div>
              <h4 className='h4 mb-[10px]'>Da'wah in the media: problems and solutions</h4>
              <p className='font-light text-[#777F81]'>Al-Qur'anul Kareem is the greatest and eternal miracle revealed by Allah subhanahu wa ta'ala to the Holy Prophet, peace and blessings be upon him...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/02.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>May 18, 2024</div>
              <h4 className='h4 mb-[10px]'>Titles and honorific titles of the Companions of the Prophet (ﷺ).</h4>
              <p className='font-light text-[#777F81]'>Only the believer has love for the Messenger of Allah, peace and blessings be upon him. Because Rasulullah SAW...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
          <div className='blog__post max-w-[420px] shadow-custom2 rounded-[10px] overflow-hidden cursor-pointer group'>
            <div className='relative overflow-hidden'>
              <img className='group-hover:scale-110 transition-all duration-500' src="img/articles/05.jpg" alt=""/>
            </div>

            <div className='px-5 py-6'>
              <div className='mb-4'>Feb 22, 2024</div>
              <h4 className='h4 mb-[10px]'>Provisions of Ushar and Kharaj</h4>
              <p className='font-light text-[#777F81]'>Without a balanced, welfare oriented and comprehensive system it is not at all possible for people to lead a healthy and normal social life...

                <a href='' className='italic underline text-[#4c5354]'>Read more</a>
              </p>
            </div>
          </div>
        </div>
        <button className="btn btn-lg btn-accent text-[17px] mx-auto xl:mx-0">
              SEE MORE ARTICLES
        </button>

      </div>
    </section>
  );
};

export default Articles;
