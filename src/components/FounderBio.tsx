// components/FounderBio.tsx

import Image from 'next/image';
import Link from 'next/link';
import type { StaticImageData } from 'next/image';

// Props for the component remain the same
interface FounderBioProps {
  name: string;
  title: string;
  imageUrl: string | StaticImageData;
  learnMoreLink: string;
  children: React.ReactNode;
}

export default function FounderBio({
  name,
  title,
  imageUrl,
  learnMoreLink,
  children,
}: FounderBioProps) {
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
          <div className="relative z-20 bg-card p-8 sm:p-12 shadow-xl rounded-lg w-full max-w-2xl lg:max-w-[600px] lg:mr-[-120px] lg:my-auto lg:self-center">
            <p className="font-sans text-sm uppercase tracking-widest text-muted-foreground mb-2">
              {title}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
              {name}
            </h2>
            <div className="space-y-4 font-sans text-base leading-relaxed text-muted-foreground">
              {children}
            </div>
            <Link
              href={learnMoreLink}
              className="inline-block mt-8 font-sans text-sm font-bold uppercase tracking-wider text-foreground transition-transform duration-200 hover:translate-x-1"
            >
              Learn More &gt;
            </Link>
          </div>
          {/* Image - right on desktop, below card on mobile */}
          <div className="relative z-10 h-[400px] sm:h-[500px] lg:h-[600px] w-full lg:w-[500px] flex-shrink-0 flex-grow-0 lg:self-center">
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