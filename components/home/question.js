import { useState } from "react";

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question:
        "Is there any zakat on 62 grams of gold or not?",
      answer:
        "No, there’s no zakat on 62 gms of gold. Zakat is on 85 gms and above of gold. However, if you have cash that’s above nisab, you must include your gold, whether 62 gms or even less.",
    },
    {
      question: "Is witr fard? The one who doesn't pray witr, is he sinful?",
      answer:
        "The one who doesn’t pray witr is not sinful as it is not an obligatory prayer, but one will miss a great reward.",
    },
    {
      question:
        "Does feeding a fasting person require a full meal to get the reward?",
      answer:
        "It is an issue of dispute among scholars. Some say that it is sufficient to give him whatever breaks his fast, even if it was a sip of water, and this is the opinion of Sheikh Ibn Othaimeen and others. Other scholars said that it has to be a full meal that would nurture a person and give him strength to worship Allah, and this is the opinion of Ibn Taimiyah.",
    },
    {
      question:
        "Can we use scented soaps while in ihram (احرام), or can we use face creams while in ihram for umrah?",
      answer: "You can use normal everyday soaps.",
    },
  ];

  return (
    <section className="faq">
      <div className="container mx-auto py-10">
        <h2 className="faq__title h2 text-[#4C5354] text-center mb-[50px]">We've got answers</h2>

        <div className="mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq__item pt-7 pb-4 accordion-item border-b-[1px] border-[#DCDCDC] cursor-pointer select-none ${
                activeIndex === index ? "open" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between mb-[10px]">
                <h4 className="h4 text-[#4C5354]">{faq.question}</h4>
                <div className="faq__btn text-accent">
                  <i
                    className={`${
                      activeIndex === index ? "ri-subtract-fill" : "ri-add-fill"
                    } text-2xl`}
                  ></i>
                </div>
              </div>
              <div
                className={`faq__answer ${
                  activeIndex === index ? "max-h-full" : "h-0 overflow-hidden"
                }`}
              >
                <p className="font-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
