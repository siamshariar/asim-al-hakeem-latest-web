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
    <section className="px-10 py-16 bg-whit h-sec h-banner h3-banner h-banner-1">
      <h2 className="text-3xl font-bold text-center mb-8">Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 page-width">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="bg-white rounded-lg shadow-lg overflow-hidden box">
            <div className="relative">
              <img src={lecture.imageUrl} alt={lecture.title} className="w-full h-48 object-cover" />
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-2">{lecture.date}</p>
              <h3 className="text-xl font-semibold mb-4">{lecture.title}</h3>
              <p className="text-gray-700 mb-4">{lecture.description} <a href="#" className="text-teal-500">Read more</a></p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
		<button className="px-10 py-3 text-lg bg-[#46B3C0] tracking-normal text-white text-[20px] rounded-3xl mx-auto xl:mx-0 hover:bg-blue-600 transition">
			SEE MORE
		</button>
      </div>
    </section>
  );
};

export default Articles;
