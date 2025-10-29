"use client";
// src/components/SplitReveal.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const SplitReveal: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // We use a context for easy cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          // Pin the .pin-container
          pin: componentRef.current,
          // Start the animation when the trigger hits the top of the viewport
          start: 'top top',
          // End after scrolling 100% of the viewport height
          end: '+=100%',
          // Link the animation to the scrollbar
          scrub: 1,
        },
      });

      tl.to(topPanelRef.current, {
        // Move top panel up by 100% of its own height
        yPercent: -100,
        ease: 'none',
      })
        .to(
          bottomPanelRef.current,
          {
            // Move bottom panel down by 100% of its own height
            yPercent: 100,
            ease: 'none',
          },
          '<' // '<' means "at the same time as the previous animation"
        )
        .to(
          contentRef.current,
          {
            // Fade in the content
            opacity: 1,
            ease: 'none',
          },
          '<25%' // Start fading in 25% into the panel animation
        );
    }, componentRef); // Scope the context to our component

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    // 1. Main container to create scroll height
    <div ref={triggerRef} className="h-[200vh] bg-gray-100">
      
      {/* 2. Sticky container that gets pinned */}
      <div
        ref={componentRef}
        className="relative h-screen overflow-hidden"
      >
        {/* 3. Revealed content (hidden initially) */}
        {/* You can get the exact bg color from your image: bg-[#e8dbcb] */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-4 bg-[#e8dbcb] p-8 text-center opacity-0"
        >
          {/* Top vertical line */}
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-black/70" />
          <div className="block sm:hidden absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-black/50" />


          <h2 className="text-2xl font-semibold text-[#5a5a5a]">
            The Soul of a Space
          </h2>
          <p className="max-w-md text-base text-[#5a5a5a]">
            Hearth & Home is a boutique interior design studio dedicated to creating spaces that are not only beautiful but deeply personal. We believe a home should be a sanctuary—a reflection of your story and a foundation for your life.
          </p>
        </div>

        {/* Bottom vertical line */}
        <div className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-40 bg-black/70" />
        <div className="block sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-black/50" />

        {/* 4. Top Split Panel */}
        {/* Use the same bg color as the content */}
        <div
          ref={topPanelRef}
          className="absolute top-0 left-0 z-20 flex h-1/2 w-full items-end justify-center overflow-hidden bg-[#e8dbcb]"
        >
          {/* The h1 is aligned to the BOTTOM of this panel.
            We add some padding to "push" it up slightly so it
            perfectly meets its bottom counterpart.
          */}
          <h1 className="pb-2 text-8xl font-serif text-[#4e554d] md:text-9xl lg:text-[10rem]">
            TA DESIGN
          </h1>
        </div>

        {/* 5. Bottom Split Panel */}
        <div
          ref={bottomPanelRef}
          className="absolute bottom-0 left-0 z-20 flex h-1/2 w-full items-start justify-center overflow-hidden bg-[#e8dbcb]"
        >
          {/* The h1 is aligned to the TOP of this panel.
            We add padding to "push" it down slightly.
          */}
          <h1 className="pt-2 text-8xl font-serif text-[#4e554d] md:text-9xl lg:text-[10rem]">
            TA DESIGN
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplitReveal;