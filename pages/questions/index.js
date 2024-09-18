import React, { useState } from "react";
import { Button } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import Header2 from "../../components/header1";

// Define your Meta component or import it if you have it elsewhere
import Meta from "../../components/Meta"; // Assuming the Meta component is imported from this path

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Questions");

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    "All Questions",
    "Hajj and Umrah",
    "Fasting",
    "Prayer",
    "Zakat",
    "Science of the Quran",
    "Slaughtering",
  ];

  const faqs = [
    {
      question:
        "I got gold around 30tola(more than 300grams) and I find it difficult to give zakat. Can I distribute the zakat between my two daughters( 4-5yrs) each one getting (6tola which is approx70 grams) ..So now zakat is reduced to 18 tola…",
      answer:
        "You can gift your daughters equally if you want, however that gold would belong to them in reality and you will not be it’s owner. They must possess it and have full control over it even if they want to sell it! Otherwise you are trying to trick Allah to avoid paying zakat",
      category: "Zakat",
    },
    {
      question:
        "I have around 62 gram gold dont know weather it is 21 18 or 22. jeweler is not telling conform, he says i wil burn it then can tell u conform. What should i do ? Is there any zakat on 62 gram gold or not ?",
      answer:
        "No, there’s no zakat on 62 gms of gold. Zakat is on 85 gms and above of gold. However, if you have cash that’s above nisab, you must include your gold, whether 62 gms or even less.",
      category: "Zakat",
    },
    {
      question: "Is witr fard. The one who doesnt prays witr is he sinful?",
      answer:
        "The one who doesn’t pray witr is not sinful as it is not obligatory prayer, but one will miss a great reward.",
      category: "Prayer",
    },
    {
      question:
        "sheikh, can you please provide me the english transliteration of the dua of istikhara that is said after praying istikhara salah. it would also be beneficial if you provide the meaning as well.",
      answer:
        "Allaahumma inni astakheeruka bi ‘ilmika wa astaqdiruka bi qudratika wa as’aluka min fadlika, fa innaka taqdiru wa laa aqdir, wa ta’lamu wa laa a’lam, wa anta ‘allaam al-ghuyoob. Allaahumma fa in kunta ta’lamu haadha’l-amra (then the matter should be mentioned by name) khayran li fi ‘aajil amri wa aajilihi (or: fi deeni wa ma’aashi wa ‘aaqibati amri) faqdurhu li wa yassirhu li thumma baarik li fihi. Allaahumma wa in kunta ta’lamu annahu sharrun li fi deeni wa ma’aashi wa ‘aaqibati amri (or: fi ‘aajili amri wa aajilihi) fasrifni ‘anhu [wasrafhu ‘anni] waqdur li al-khayr haythu kaana thumma radini bihi (O Allaah, I seek Your guidance [in making a choice] by virtue of Your knowledge, and I seek ability by virtue of Your power, and I ask You of Your great bounty. You have power, I have none. And You know, I know not. You are the Knower of hidden things. O Allaah, if in Your knowledge, this matter (then it should be mentioned by name) is good for me both in this world and in the Hereafter (or: in my religion, my livelihood and my affairs), then ordain it for me, make it easy for me, and bless it for me. And if in Your knowledge it is bad for me and for my religion, my livelihood and my affairs (or: for me both in this world and the next), then turn me away from it, [and turn it away from me], and ordain for me the good wherever it may be and make me pleased with it).” Narrated by al-Bukhaari in several places in his Saheeh (1166). You will find this and many other djikr and duas in a booklet called ‘Hisnul Muslim’, in English its called ‘Fortress of the Muslim’.",
      category: "Prayer",
    },
    {
      question:
        "I am Living in Tabuk and I want to go to Makkah for some personal reason. I will cross Meeqat from Yanbu. Is it mandatory to perform Umrah. I am actually not willing to do it. Or someone coming from any otherside of kingdom like Taif for personal reasons. Do he have to perform Umrah?",
      answer: "No, it’s not mandatory to make umrah when you cross the meeqat for any other purpose.",
      category: "Hajj and Umrah",
    },
    {
      question:
        "Can we use scented soaps while in ihram (احرام), or can we use face creams while in ihram for umrah?",
      answer: "You can use normal everyday soaps.",
      category: "Hajj and Umrah",
    },
    {
      question:
        "Shaikh I have heard from someone that during the 1st Umra, we can only touch and kiss the walls of the Ka’aba if we are going for another one, so we are sinful if we kiss and touch the Ka’aba. I think it’s not true, but I can’t confirm this concept.",
      answer: "This is totally baseless and an innovation. You can only touch the Yemeni corner and the black stone, whether this is your 1st or last umrah.",
      category: "Hajj and Umrah",
    },
    {
      question:
        "I learned that to get the reward of someone’s fasting u have to give him a proper meal,not just a date/a glass of water.is it true",
      answer:
        "It is an issue of dispute among scholars. Some say that it is sufficient to give him whatever breaks his fast even if it was a sip of water and this is the opinion of Sheikh Ibn othaimeen and others. Other scholars said that it has to be a full meal that would nurture a person and give him strength to worship Allah and this is the opinion of Ibn Taimiyah.",
      category: "Fasting",
    },
    {
      question:
        "My brother gets unbearably painful kidney stones often. It worsened during Ramadan last year due to dehydration. Is he exempted from fasting and can we give fidya instead?",
      answer: "If he is exempted from fasting according to the instructions of a trusted Muslim doctor and the doctors say that he would never be able to fast again till the rest of his life, he can feed one person after the day of Ramadan is over. You must not give it in advance. But if the doctors say that he will recover in few years time, he must not feed and must wait until he is recovered and then make up all these missed days.",
      category: "Fasting",
    },
    {
      question:
        "If a woman is recommended by kaafir doctor to not fast because she is breastfeeding, is she obliged to feed the baby artificial formula(liquid/powder) milk made for infants/toddles and fast? or can she listen to the recommendation of the kaafir doctor and not fast?",
      answer: "A breastfeeding woman can skip fasting without the recommendation of a doctor whether Muslim or kafir if there is hardship or difficulty on her. She must make up for such missed days once she is able.",
      category: "Fasting",
    },
    {
      question:
        "Sheikh is it permissible to to pray Maghreb and then break my fast",
      answer: "No. You must first break your fast, even if only with a date or water and then pray maghrib. Prophet salla Allahu alaihi wa sallam said we must hasten to break the fast.",
      category: "Fasting",
    },
    {
      question:
        "A scholar said that there’s no need to fast on the 9th or 11th of muharram because nowadays no jew fasts on Ashurah, so there’s no need to be diffrent from them, he further said that fast only on the 10th of muharram. How correct this opinion is please clarify?",
      answer: "This so called scholar is wrong as he is going against the instructions of the prophet salla Allahu alaihi wa sallam. We fast it since Prophet salla Allahu alaihi wa sallam had said that if he lived another year, he would fast on the 9th! We believe that the prophet salla Allahu alaihi wa sallam knows more that this so called scholar!",
      category: "Fasting",
    },
  ];
  // Filter FAQs based on selected category
  const filteredFaqs =
    selectedCategory === "All Questions"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <>
      {/* Meta Component */}
      <Meta
        title="Frequently Asked Questions"
        description="Find answers to commonly asked questions on a variety of topics, including Hajj, Fasting, Prayer, and more."
        url="/faq"
        image="/img/faq-banner.jpg"
        type="website"
      />

      {/* Header2 Component */}
      <Header2
        playlists={[]} // Provide the correct playlists data or remove this prop if not used
        lectures={[]} // Provide the correct lectures data or remove this prop if not used
        qna_categories={categories} // Use the categories array for qna_categories if needed
      />

      <section className="faq">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-6 space-y-4 sm:space-y-4 sm:space-x-3">
            {categories.map((category) => (
              <Button
                key={category}
                type={selectedCategory === category ? "primary" : "default"}
                style={{ padding: "1rem" }} // Inline padding style
                className={`mx-1 text-lg custom-button ${
                  selectedCategory === category ? "active" : ""
                } ${
                  category === "All Questions" ? "mt-4" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null); // Reset activeIndex to collapse FAQ when category changes
                }}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq__item px-8 pt-7 pb-4 cursor-pointer select-none ${
                    activeIndex === index ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-start mb-4">
                    <div className="text-xl text-gray-600 font-semibold mr-4">
                      {index + 1}.
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800 text-xl">{faq.question}</h4>
                    </div>
                    <div className="ml-4 text-accent">
                      <i
                        className={`${
                          activeIndex === index
                            ? "ri-subtract-fill"
                            : "ri-add-fill"
                        } text-2xl`}
                      ></i>
                    </div>
                  </div>
                  <div
                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                      activeIndex === index ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <p className="font-light text-lg mx-10">{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No questions found for this category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Question;
