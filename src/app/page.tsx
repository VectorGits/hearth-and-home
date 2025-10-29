// page.tsx

import Hero from "@/components/Hero";
import BackgroundImage from "@/components/BackgroundImage";
import Navbar from "@/components/Navbar";
import FounderBio from "@/components/FounderBio";
import OurSpecialty from "@/components/OurSpecialty";
import Expertise from "@/components/Expertise";
import TestimonialSlider from "@/components/Testimonials";
import SplitReveal from "@/components/SplitReveal";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <BackgroundImage />
      <Navbar />
      <Hero />
      
      <SplitReveal />

      {/* Commented out: The Soul of a Space section */}
      {false && (
        <section className="relative z-20 min-h-screen w-full bg-background flex flex-col justify-center items-center">
          {/* Top vertical line */}
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-black/70" />
          <div className="block sm:hidden absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-black/50" />
          <div className="container mx-auto py-12 px-6 md:px-12 text-center flex flex-col items-center">
            {/* Use `text-foreground` for main headings */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4">The Soul of a Space</h2>
            {/* Use `text-muted-foreground` for paragraphs */}
            <p className="font-sans text-muted-foreground text-sm md:text-lg max-w-3xl mb-4">
              Hearth & Home is a boutique interior design studio dedicated to creating spaces that are not only beautiful but deeply personal. We believe a home should be a sanctuary—a reflection of your story and a foundation for your life.
            </p>
            <p className="font-sans text-muted-foreground text-sm md:text-lg max-w-3xl">
              We understand that the journey to creating this sanctuary can feel overwhelming. The countless decisions and complexities of the design process can overshadow the joy of building a home. That&apos;s why our approach is built on collaboration and intention. We guide you through every choice, from the grandest architectural details to the most intimate finishing touches, ensuring the experience is as seamless and enjoyable as the final result.
            </p>
          </div>
          {/* Bottom vertical line */}
          <div className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-40 bg-black/70" />
          <div className="block sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-black/50" />
        </section>
      )}

      <FounderBio />
      <OurSpecialty />
      <ServicesSection />
      <Expertise />
      <TestimonialSlider />
      <SplitReveal />
    </main>
  );
}