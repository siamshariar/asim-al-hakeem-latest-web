import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      location: "United Kingdom",
      text: "Sheikh Assim's lectures have been a guiding light in my journey of learning Islam. His clear explanations and authentic approach make complex topics easy to understand.",
      rating: 5,
    },
    {
      id: 2,
      name: "Fatima Rahman",
      location: "United States",
      text: "The counseling session with Sheikh Assim was life-changing. His wisdom and compassion helped me navigate through a difficult time in my marriage.",
      rating: 5,
    },
    {
      id: 3,
      name: "Omar Farooq",
      location: "Canada",
      text: "I've been following Sheikh Assim's Q&A sessions for years. His answers are always grounded in authentic sources and practical wisdom. Truly a blessing for the Ummah.",
      rating: 5,
    },
    {
      id: 4,
      name: "Aisha Malik",
      location: "Australia",
      text: "The books by Sheikh Assim are a treasure trove of Islamic knowledge. They're well-researched and presented in an easy-to-understand manner. Highly recommended!",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5">
      <div className="container max-w-[1260px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mt-2 mb-4">What People Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from those who have benefited from Sheikh Assim's guidance and teachings
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="relative h-[400px] lg:h-[350px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-center"
                >
                  <Quote size={48} className="text-accent/20 mb-6" />
                  <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed italic">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-primary">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-500">{testimonials[currentIndex].location}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "w-8 bg-accent" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}