import { Download, Share2 } from 'lucide-react'; // Lucide Icons
import Image from 'next/image';
import { useRouter } from 'next/router';
import Meta from '../../components/meta';
import Header2 from '../../components/header1';
import { useState } from 'react';

const bookData = {
  1: {
    id: 1,
    name: 'The Islamic Faith',
    writer: 'Assim Alhakeem',
    translator: 'Adil Salhi',
    image: '/img/books/book-1.jpg', // Replace with the appropriate image path
    description: `Here is a very interesting book on the fundamentals of belief. Its author wrote it in response to the question: "What will the servant be questioned on the day of judgment?`,
    quote: '',
    rating: 3.94,
    totalRatings: '2,637,456',
    totalReviews: '53,272',
    downloadLink: '/path/to/download', // Example download link
  },
  2: {
    id: 2,
    name: 'Rulings of Islamic Law - A Simplified Presentation',
    writer: 'Assim Alhakeem',
    translator: 'Adil Salhi',
    image: '/img/books/book-2.jpg', // Replace with the appropriate image path
    description: `This book, Rulings of Islamic Law: A Simplified Presentation is the first of a series which aims to provide Islamic knowledge covering all the areas of life in which a person needs authentic Islamic knowledge from validated sources.`,
    quote: '',
    rating: 3.94,
    totalRatings: '2,637,456',
    totalReviews: '53,272',
    downloadLink: '/path/to/download', // Example download link
  },
  3: {
    id: 3,
    name: 'Rulings of Islamic Law - A Simplified Presentation',
    writer: 'Assim Alhakeem',
    translator: 'Adil Salhi',
    image: '/img/books/book-3.jpg', // Replace with the appropriate image path
    description: `This book, Rulings of Islamic Law: A Simplified Presentation is the first of a series which aims to provide Islamic knowledge covering all the areas of life in which a person needs authentic Islamic knowledge from validated sources.`,
    quote: '',
    rating: 3.94,
    totalRatings: '2,637,456',
    totalReviews: '53,272',
    downloadLink: '/path/to/download', // Example download link
  },
  4: {
    id: 4,
    name: 'Rulings of Islamic Law - A Simplified Presentation',
    writer: 'Assim Alhakeem',
    translator: 'Adil Salhi',
    image: '/img/books/book-4.jpg', // Replace with the appropriate image path
    description: `This book, Rulings of Islamic Law: A Simplified Presentation is the first of a series which aims to provide Islamic knowledge covering all the areas of life in which a person needs authentic Islamic knowledge from validated sources.`,
    quote: '',
    rating: 3.94,
    totalRatings: '2,637,456',
    totalReviews: '53,272',
    downloadLink: '/path/to/download', // Example download link
  },
  // Add more book data as necessary
};

const BookDetail = ({ playlists, headerLectures, qnaCategories }) => {
  const router = useRouter();
  const { id } = router.query;
  const book = bookData[id]; // Get book data based on the ID

  const [showMore, setShowMore] = useState(false);

  if (!book) {
    return <div>Loading...</div>; // Handle case where book data is not yet available
  }

  return (
    <>
      <Meta
        title={book.name}
        description={book.description}
        url={`/book/${id}`}
        image={book.image}
        type="article"
      />
      <Header2
        playlists={playlists}
        lectures={headerLectures}
        qna_categories={qnaCategories}
      />
      <div className="container mx-auto py-12 px-4 lg:px-0">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 flex">
          <div className="w-1/4">
            <Image 
              src={book.image} 
              alt={book.name} 
              width={150} 
              height={230} 
              className="rounded-lg shadow-md"
            />
          </div>
          
      
          <div className="ml-6 flex-1">
            <h1 className="text-2xl ml-3 font-bold text-gray-800">
              {book.name}
            </h1>
            <p className="text-gray-600 text-lg mt-4 ml-4">
              <strong>Writer:</strong> {book.writer}
            </p>
            <p className="text-gray-600 pb-4 border-b-[2px] border-[#DCDCDC] text-lg mt-2 ml-4">
              <strong>Translator:</strong> {book.translator}
            </p>
            <div className="mt-4  flex items-center">
              <a
                href={book.downloadLink}
                download
                className="bg-teal-500 text-white ml-5 mt-3 px-3 py-3 text-lg rounded-lg flex items-center hover:bg-teal-600 transition"
              >
                <Download className="mr-2" />
                Download
              </a>

              <button
                className="ml-auto bg-gray-500 text-[#14B8A6] px-3 py-1 text-lg rounded-lg flex items-center hover:bg-gray-600 transition"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: book.name,
                      text: 'Check out this book!',
                      url: window.location.href,
                    });
                  } else {
                    alert('Sharing not supported in this browser');
                  }
                }}
              >
              <Share2 className="mr-2" />
              Share
            </button>
            </div>

            <div className="mt-6 ml-5">
              <p className="text-gray-600 text-lg">
                {book.description}
              </p>
              {showMore && (
                <p className="text-gray-600 mt-2">
                  {book.quote}
                </p>
              )}
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-teal-600 mt-2"
              >
                {showMore ? 'See less' : 'See more'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
