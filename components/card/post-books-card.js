// components/post-books-card.js
import React from 'react';

const BookCard = ({ book }) => (
  <div className="flex flex-col xl:flex-row items-center gap-[30px] mb-[50px]">
    <div className="flex-1">
      <img
        src={book.image}
        alt={book.name}
        className="w-full h-auto rounded-lg"
        width={book.width || 'auto'}
        height={book.height || 'auto'}
      />
    </div>
    <div className="flex-1 flex flex-col">
      <h4 className="h4 text-[#4C5354] font-bold text-2xl mb-[8px]">{book.name}</h4>
      <div className="text-[#9AB4B7] text-[22px] mb-[12px] max-w-[320px]">{book.position}</div>
      <p className="font-light text-[#777F81] text-[20px] mb-[26px] max-w-[320px]">{book.description}</p>
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
);

const PostBooksCard = ({ books }) => {
  if (!books || books.length === 0) return <p>No books available.</p>;

  return (
    <section className="post-books pb-100 py-12 section pb-[100px]">
      <div className="container mx-auto">
        <h2 className="post-books__title text-4xl font-bold mb-[50px] text-center xl:text-left">Books</h2>
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </section>
  );
};

export default PostBooksCard;
