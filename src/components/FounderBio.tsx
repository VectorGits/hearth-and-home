"use client";

// components/FounderBio.tsx

import Image from 'next/image';
import Link from 'next/link';
import type { StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// Default content
const defaultContent = {
  name: "Vector Founder",
  title: "Founder & Lead Designer",
  imageUrl: '/images/female-CEO.jpg',
  learnMoreLink: "/about",
  paragraphs: [
    "I truly believe your home should be a sanctuary—a place that enhances your well-being and brings calm, serenity, and joy to your everyday life. This philosophy drives everything my team and I do.",
    "We are dedicated to creating timeless, elevated spaces that are as effortlessly livable as they are uniquely yours. From our first consultation to the final styling touch, we manage every detail, ensuring the entire process is seamless, stress-free, and enjoyable."
  ]
};

interface FounderBioProps {
  name?: string;
  title?: string;
  imageUrl?: string | StaticImageData;
  learnMoreLink?: string;
  paragraphs?: string[];
}

export default function FounderBio({
  name = defaultContent.name,
  title = defaultContent.title,
  imageUrl = defaultContent.imageUrl,
  learnMoreLink = defaultContent.learnMoreLink,
  paragraphs = defaultContent.paragraphs,
}: FounderBioProps = {}) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        duration: 2,
        scrambleText: {
          text: title,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          revealDelay: 0.3,
          speed: 0.3,
        },
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      });
    });

    return () => ctx.revert();
  }, [title]);

  // Split the name heading into characters and animate upward with stagger
  useEffect(() => {
    if (!nameRef.current) return;

    const el = nameRef.current;
    const original = el.textContent || "";

    // Build spans per character (preserve spaces)
    const html = original
      .split("")
      .map((ch) => `<span class="char inline-block will-change-transform">${ch === " " ? "&nbsp;" : ch}</span>`) // tailwind classes applied to spans
      .join("");

    el.innerHTML = html;

    const chars = Array.from(el.querySelectorAll<HTMLSpanElement>(".char"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    // Cleanup: restore original text when unmounting
    return () => {
      ctx.revert();
      el.textContent = original;
    };
  }, [name]);

  // Animate the CTA Link: slide in from left with elastic bounce
  useEffect(() => {
    if (!linkRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(linkRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out',
        scrollTrigger: {
          trigger: linkRef.current!,
          start: 'top 90%',
          toggleActions: "play none none reset",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Animate text card from right and image from left
  useEffect(() => {
    if (!textCardRef.current || !imageContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Text card slides in from the right
      gsap.from(textCardRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textCardRef.current!,
          start: 'top 80%',
          toggleActions: "play none none reset",
        },
      });

      // Image slides in from the left
      gsap.from(imageContainerRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageContainerRef.current!,
          start: 'top 80%',
          toggleActions: "play none none reset",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* 
          Main Grid Container
          - Uses a 12-column grid on large screens (lg) to precisely control positioning.
          - `items-center` vertically aligns the text card with the image.
        */}
  <div className="relative flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-center lg:h-[600px]">
          {/* Text Card - left on desktop, above image on mobile */}
          <div ref={textCardRef} className="relative z-20 bg-card p-8 sm:p-12 shadow-xl rounded-lg w-full max-w-2xl lg:max-w-[600px] lg:mr-[-120px] lg:my-auto lg:self-center">
            <p ref={titleRef} className="font-sans text-sm uppercase tracking-widest text-muted-foreground mb-2">
              {/* Initial empty text, will be scrambled in by GSAP */}
            </p>
            <h2 ref={nameRef} className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
              {name}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-muted-foreground">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={learnMoreLink}
              ref={linkRef}
              className="inline-block mt-8 font-sans text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-200 hover:translate-x-1"
            >
              Learn More &gt;
            </Link>
          </div>
          {/* Image - right on desktop, below card on mobile */}
          <div ref={imageContainerRef} className="relative z-10 h-[400px] sm:h-[500px] lg:h-[600px] w-full lg:w-[500px] flex-shrink-0 flex-grow-0 lg:self-center">
            <Image
              src={imageUrl}
              alt={`Portrait of ${name}`}
              fill
              className="object-cover object-top rounded-lg"
              sizes="(max-width: 1023px) 100vw, 500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}