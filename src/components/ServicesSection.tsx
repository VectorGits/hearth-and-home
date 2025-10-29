"use client";

import React, { CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -----------------------------
// 1) Mock Data (at least 10 items)
// -----------------------------
export interface ServiceItem {
  id: number;
  title: string;
  iconSrc: string;
}

const servicesData: ServiceItem[] = [
  { id: 1, title: "CUSTOM CABINETRY", iconSrc: "/images/dltinteriors_cabinets.png" },
  { id: 2, title: "CLOSET DESIGN", iconSrc: "/images/dltinteriors_closetdesign.png" },
  { id: 3, title: "CUSTOM WINDOW TREATMENTS", iconSrc: "/images/dltinteriors_windowtreatments.png" },
  { id: 4, title: "WALL COVERINGS", iconSrc: "/images/dltinteriors_wallpaper.png" },
  { id: 5, title: "FLOORING & RUGS", iconSrc: "/images/dltinteriors_rug.png" },
  { id: 6, title: "MATERIALS & FINISHES", iconSrc: "/images/dltinteriors_materials.png" },
  { id: 7, title: "KITCHEN & BATHROOM DESIGN", iconSrc: "/images/dltinteriors_kitchendesign.png" },
  { id: 8, title: "FULL FURNISHINGS", iconSrc: "/images/dltinteriors_furnishings.png" },
  { id: 9, title: "LIGHTING DESIGN", iconSrc: "/images/dltinteriors_lighitngdesign.png" },
  { id: 10, title: "FULL FURNISHINGS", iconSrc: "/images/dltinteriors_furnishings.png" },
];

// -----------------------------
// Small hook to detect mobile
// -----------------------------
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

// -----------------------------
// Component
// -----------------------------
const ServicesSection: React.FC = () => {
  const isMobile = useIsMobile(768);

  // Refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const desktopItemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const topRowRef = useRef<HTMLDivElement | null>(null);
  const bottomRowRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const mobileItemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Split for mobile columns and desktop rows
  const [leftColumnItems, rightColumnItems, topRowItems, bottomRowItems] = useMemo(() => {
    const left: ServiceItem[] = [];
    const right: ServiceItem[] = [];
    servicesData.forEach((s, i) => (i % 2 === 0 ? left.push(s) : right.push(s)));
    
    // Split into 2 rows of 5 for desktop
    const topRow = servicesData.slice(0, 5);
    const bottomRow = servicesData.slice(5, 10);
    
    return [left, right, topRow, bottomRow];
  }, []);

  // Fade mask styles for mobile columns
  const fadeMaskStyle = useMemo<CSSProperties>(
    () => ({
      maskImage:
        "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
    }),
    []
  );

  // GSAP Animations
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // ---------------- Desktop Animations ----------------
        const items = desktopItemsRef.current.filter(Boolean) as HTMLDivElement[];

        // Staggered load-in when section enters view
        gsap.from(items, {
          opacity: 0,
          y: 50,
          ease: "power2.out",
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        });

        // Parallax scroll for top row (moves left)
        if (topRowRef.current) {
          gsap.to(topRowRef.current, {
            x: -100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top bottom",
              end: "bottom top",
              // markers: true,
              scrub: true,
            },
          });
        }

        // Parallax scroll for bottom row (moves right)
        if (bottomRowRef.current) {
          gsap.to(bottomRowRef.current, {
            x: 100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      } else {
        // ---------------- Mobile Animations ----------------
        if (leftColRef.current && rightColRef.current) {
          gsap.to(leftColRef.current, {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 75%",
              end: "bottom 90%",
              // markers: true,
              scrub: true,
            },
          });

          gsap.to(rightColRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 75%",
              end: "bottom 90%",
              scrub: true,
            },
          });
        }

        // Magnify at center for each item
        const mItems = mobileItemRefs.current.filter(Boolean) as HTMLDivElement[];
        mItems.forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1.5,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16">
        <h2 className="mb-16 text-center text-2xl md:text-3xl font-serif tracking-wide text-[#4e554d]">
          Our Services
        </h2>

        {/* Desktop layout */}
        {!isMobile && (
          <div className="space-y-12 py-8">
            {/* Top Row - moves left on scroll */}
            <div ref={topRowRef} className="flex justify-center gap-6 md:gap-8 pb-6">
              {topRowItems.map((service, idx) => (
                <div
                  key={service.id}
                  ref={(el) => { desktopItemsRef.current[idx] = el; }}
                  className="group flex flex-col items-center justify-center p-2 md:p-3 text-center transition-transform duration-200 hover:scale-105"
                >
                  <div className="mb-3 flex h-24 w-24 md:h-28 md:w-28 items-center justify-center">
                    <img src={service.iconSrc} alt={service.title} className="h-24 w-24 md:h-28 md:w-28 object-contain" />
                  </div>
                  <p className="text-[11px] md:text-[12px] lg:text-[13px] font-medium tracking-[0.14em] leading-tight text-[#8a8f86] text-center">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Row - moves right on scroll */}
            <div ref={bottomRowRef} className="flex justify-center gap-6 md:gap-8 pt-6 pb-8">
              {bottomRowItems.map((service, idx) => (
                <div
                  key={service.id}
                  ref={(el) => { desktopItemsRef.current[5 + idx] = el; }}
                  className="group flex flex-col items-center justify-center p-2 md:p-3 text-center transition-transform duration-200 hover:scale-105"
                >
                  <div className="mb-3 flex h-24 w-24 md:h-28 md:w-28 items-center justify-center">
                    <img src={service.iconSrc} alt={service.title} className="h-24 w-24 md:h-28 md:w-28 object-contain" />
                  </div>
                  <p className="text-[11px] md:text-[12px] lg:text-[13px] font-medium tracking-[0.14em] leading-tight text-[#8a8f86] text-center">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile layout */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div
              ref={leftColRef}
              className="space-y-3 pr-1"
              style={fadeMaskStyle}
            >
              {leftColumnItems.map((service, idx) => (
                <div
                  key={service.id}
                  ref={(el) => { mobileItemRefs.current[idx] = el; }}
                  className="flex flex-col items-center justify-center p-2 text-center"
                >
                  <div className="mb-2 flex h-20 w-20 items-center justify-center">
                    <img src={service.iconSrc} alt={service.title} className="h-20 w-20 object-contain" />
                  </div>
                  <p className="text-[11px] font-medium tracking-[0.14em] leading-tight text-[#8a8f86] text-center">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div
              ref={rightColRef}
              className="space-y-3 pl-1"
              style={fadeMaskStyle}
            >
              {rightColumnItems.map((service, rIdx) => (
                <div
                  key={service.id}
                  ref={(el) => { mobileItemRefs.current[leftColumnItems.length + rIdx] = el; }}
                  className="flex flex-col items-center justify-center p-2 text-center"
                >
                  <div className="mb-2 flex h-20 w-20 items-center justify-center">
                    <img src={service.iconSrc} alt={service.title} className="h-20 w-20 object-contain" />
                  </div>
                  <p className="text-[11px] font-medium tracking-[0.14em] leading-tight text-[#8a8f86] text-center">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
