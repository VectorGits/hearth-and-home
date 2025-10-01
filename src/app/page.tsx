// page.tsx

import Hero from "@/components/Hero";
import BackgroundImage from "@/components/BackgroundImage";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import FounderBio from "@/components/FounderBio";
import OurSpecialty from "@/components/OurSpecialty";


const founderPortrait = '/images/female-CEO.jpg';


export default function Home() {
  return (
    <main>
      <BackgroundImage />
      <Navbar />
      <Hero />
      
      {/* This is the next section that will be revealed on scroll */}
      {/* USE THE CORRECT CLASS NAMES! */}
      <section className="relative z-20 min-h-screen w-full bg-background">
        <div className="container mx-auto py-12 px-6 md:px-12 text-center flex flex-col items-center">
          
          {/* Use `text-foreground` for main headings */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4">The Soul of a Space</h2>
          
          {/* Use `text-muted-foreground` for paragraphs */}
          <p className="font-sans text-muted-foreground text-sm md:text-lg max-w-3xl mb-4">
            Hearth & Home is a boutique interior design studio dedicated to creating spaces that are not only beautiful but deeply personal. We believe a home should be a sanctuary—a reflection of your story and a foundation for your life.
          </p>
          <p className="font-sans text-muted-foreground text-sm md:text-lg max-w-3xl">
            We understand that the journey to creating this sanctuary can feel overwhelming. The countless decisions and complexities of the design process can overshadow the joy of building a home. That's why our approach is built on collaboration and intention. We guide you through every choice, from the grandest architectural details to the most intimate finishing touches, ensuring the experience is as seamless and enjoyable as the final result.
          </p>
          
        </div>
      </section>
      <FounderBio
        name="Vector Founder" // Replace with a fictional founder's name
        title="Founder & Lead Designer"
        imageUrl={founderPortrait}
        learnMoreLink="/about"
      >
        {/* 
          Using children allows you to easily have multiple paragraphs 
          or other elements inside the bio section.
        */}
        <p>
          I truly believe your home should be a sanctuary—a place that enhances 
          your well-being and brings calm, serenity, and joy to your everyday life. 
          This philosophy drives everything my team and I do.
        </p>
        <p>
          We are dedicated to creating timeless, elevated spaces that are as 
          effortlessly livable as they are uniquely yours. From our first 
          consultation to the final styling touch, we manage every detail, 
          ensuring the entire process is seamless, stress-free, and enjoyable.
        </p>
      </FounderBio>
      <OurSpecialty />
    </main>
  );
}