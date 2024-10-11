import React from 'react';

const Hero = () => {
  return (
    <div className="h-[75vh] flex items-center justify-between px-8">
      {/* Left Section */}
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-8">
          <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 mt-8 hover:bg-zinc-800 rounded-full">
            Discover Books
          </button>
        </div>
      </div>

      {/* Right Section with the image */}
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center ml-4 lg:ml-8">
      <img
  src="https://cdn.pixabay.com/photo/2024/04/19/12/13/ai-generated-8706226_640.png"
  alt="Book image"
  className="w-[34rem] h-[34rem] rounded-full object-cover"
/>

      </div>
    </div>
  );
};

export default Hero;
