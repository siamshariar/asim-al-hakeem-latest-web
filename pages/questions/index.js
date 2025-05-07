import { useState } from "react";
import Header2 from "../../components/header1";
import { getAllPlaylists2, getHeaderLectures, getAllQnaCategory } from "../../lib/fetch";
import Meta from "../../components/meta";
import { categories, faqs } from "../../data/questions"

const Question = ({ playlists, headerLectures, qnaCategories }) => {
  const [expandedFaqs, setExpandedFaqs] = useState({})

  const [selectedCategory, setSelectedCategory] = useState("All Questions")
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Filter FAQs based on the selected category
  const filteredFaqs =
    selectedCategory === "All Questions" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setExpandedFaqs({})
  }

  const openModal = (faq) => {
    setSelectedFaq(faq)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedFaq(null)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      {/* Meta Component for SEO */}
      <Meta
        title="Questions"
        description="Find answers to commonly asked questions on a variety of topics, including Hajj, Fasting, Prayer, and more."
        url="/faq"
        image="/img/faq-banner.jpg"
        type="website"
      />

      {/* Header2 Component with passed data */}
      <Header2 playlists={playlists} lectures={headerLectures} qna_categories={qnaCategories} />

      <section className="faq">
        <div className="container mx-auto py-0 mt-72 md:mt-72 lg:mt-48">
          {/* Category Filter */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side Categories */}
            <div className="w-full md:w-1/4 pr-0 md:pr-6 mb-6 md:mb-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                        selectedCategory === category ? "bg-gray-100 font-medium" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <i className="ri-arrow-right-s-line mr-2"></i>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Cards */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => {
                    // Create a unique key for each FAQ
                    const faqKey = `${selectedCategory}-${index}`
                    const isExpanded = expandedFaqs[faqKey]

                    return (
                      <div
                        key={faqKey}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        style={{ height: "fit-content", position: "relative" }}
                        onClick={() => openModal(faq)}
                      >
                        <div className="p-5">
                          <h4 className="text-lg font-medium mb-3 line-clamp-2">{faq.question}</h4>
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{faq.category}</span>
                          </div>

                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t text-gray-700">
                              <p>{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-600">No questions found for this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {modalOpen && selectedFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold pr-8">{selectedFaq.question}</h3>
                
              </div>
              <div className="text-sm text-gray-500 mb-4">Category: {selectedFaq.category}</div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-700">{selectedFaq.answer}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Question;


export async function getStaticProps() {
  const playlists = await getAllPlaylists2();
  const headerLectures = await getHeaderLectures();
  const qnaCategories = await getAllQnaCategory();

  return {
    props: {
      playlists: playlists.playlists, // Assuming playlists is an object with a playlists property
      headerLectures,
      qnaCategories,
    },
    revalidate: 60, // ISR: Revalidate the data every 60 seconds
  };
}
