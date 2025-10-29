'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Array of testimonial objects
const testimonials = [
  {
    text:
      "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    author: 'Tanya Sinclair',
    role: 'UX Engineer',
    imageSrc: '/images/image-tanya.jpg',
  },
  {
    text:
      "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting my career as a developer. ”",
    author: 'John Tarkpor',
    role: 'Junior Front-end Developer',
    imageSrc: '/images/image-john.jpg',
  },
  {
    text:
      "“ This course was a life-changer. The curriculum is top-notch, and the community support is amazing. I went from a complete beginner to a confident developer in just a few months. Highly recommended! ”",
    author: 'Jane Appleseed',
    role: 'Software Engineer',
    imageSrc: '/images/image-jane.jpg',
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to reset the autoplay timer
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Set up the autoplay effect
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Change slide every 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  // Get the current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-background p-8"
      onMouseEnter={resetTimeout} // Pause on hover
    >
      {/* Main container for slider content */}
      <div className="relative lg:flex lg:flex-row-reverse items-center w-full max-w-5xl">

        {/* Image Section */}
        <div className="relative lg:w-1/2 flex justify-center lg:justify-start">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-bg.svg')] bg-no-repeat bg-center scale-110"></div>
            <div className="relative p-8">
                {/* Use a key to force re-render and trigger animation on change */}
                <div key={currentIndex} className="animate-fade-in">
                    <Image 
                        src={currentTestimonial.imageSrc} 
                        alt={currentTestimonial.author}
                        width={450}
                        height={450}
                        className="rounded-md shadow-2xl"
                        priority={true} // Prioritize loading the visible image
                    />
                </div>
                 {/* Carousel Arrows */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-20 lg:-translate-x-0 flex gap-x-6 z-20 bg-white rounded-full p-3 shadow-md">
                    <button
                      onClick={goToPrevious}
                      className="flex items-center justify-center hover:opacity-75 transition"
                      aria-label="Previous"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18"><path fill="none" stroke="#8585AC" strokeWidth="3" d="M11 1L3 9l8 8"/></svg>
                    </button>
                    <button
                      onClick={goToNext}
                      className="flex items-center justify-center hover:opacity-75 transition"
                      aria-label="Next"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18"><path fill="none" stroke="#8585AC" strokeWidth="3" d="M2 1l8 8-8 8"/></svg>
                    </button>
                </div>
            </div>
        </div>

        {/* Testimonial Content */}
        {/* Use a key to force re-render and trigger animation on change */}
        <div key={`${currentIndex}-text`} className="relative lg:w-1/2 lg:-mr-24 text-center lg:text-left z-10 mt-6 lg:mt-0 animate-fade-in">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-24 lg:top-[-4rem] lg:-translate-x-0 w-[100px] h-[100px] bg-[url('/pattern-quotes.svg')] bg-no-repeat bg-contain -z-10"></div>
            <p className="text-xl md:text-2xl text-gray-700 font-light leading-snug pt-6 lg:pt-0">
              {currentTestimonial.text}
            </p>
            <div className="mt-3 md:mt-6">
              <span className="font-bold text-gray-800">{currentTestimonial.author}</span>
              <span className="text-gray-500 font-medium ml-2">{currentTestimonial.role}</span>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Testimonials;