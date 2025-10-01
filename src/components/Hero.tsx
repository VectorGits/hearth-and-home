// components/Hero.tsx

import Link from 'next/link';

export default function Hero() {
  return (
    // This section is now just a container for the content.
    // It still needs to be full-height to push the next section down.
    <section className="text-primary-foreground relative h-screen w-full flex items-center justify-center text-center">
      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-primary-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-cream max-w-4xl mx-auto leading-tight">
          After all, good design isn't just about how a space looks — it's about how it makes you feel.
        </h1>
        <Link
          href="/services"
          className="inline-block mt-8 text-sm font-sans tracking-widest text-cream border-b border-cream pb-1 hover:text-opacity-80 hover:border-opacity-80 transition-all"
        >
          EXPERIENCE YOUR INTERIOR WITH US!
        </Link>
      </div>

      {/* Decorative Scroll-Down Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-20 w-px bg-cream/50" />
    </section>
  );
}