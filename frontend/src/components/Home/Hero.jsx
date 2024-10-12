import React from 'react';
import { Link } from 'react-router-dom'; // Don't forget to import Link from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center px-4">
      {/* Left Section */}
      <div className="w-full mb-8 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-zinc-300 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-6">
          <Link 
            to="/all-books"
            className="text-yellow-100 text-lg sm:text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 sm:px-10 py-2 sm:py-3 mt-6 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link> {/* Fixed the closing tag */}
        </div>
      </div>

      {/* Right Section with the image */}
      <div className="w-full lg:w-3/6 h-auto flex items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2024/04/19/12/13/ai-generated-8706226_640.png"
          alt="Book image"
          className="w-[16rem] sm:w-[20rem] lg:w-[34rem] h-[16rem] sm:h-[20rem] lg:h-[34rem] rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
