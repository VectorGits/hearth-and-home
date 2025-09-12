import Hero from "@/components/Hero";
import BackgroundImage from "@/components/BackgroundImage";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <BackgroundImage />
      <Navbar />
      <Hero />
      
      {/* This is the next section that will be revealed on scroll */}
      <section className="relative z-20 min-h-screen w-full bg-cream" style={{backgroundColor: '#f0e4d7'}}>
        <div className="container mx-auto p-12 text-center flex flex-col items-center">
          <h2 className="text-4xl font-serif text-charcoal mb-4">The Soul of a Space</h2>
          <p className="font-sans max-w-3xl mb-4">Hearth & Home is a boutique interior design studio dedicated to creating spaces that are not only beautiful but deeply personal. We believe a home should be a sanctuary—a reflection of your story and a foundation for your life. </p>
          <p className="font-sans max-w-3xl">We understand that the journey to creating this sanctuary can feel overwhelming. The countless decisions and complexities of the design process can overshadow the joy of building a home. That's why our approach is built on collaboration and intention. We guide you through every choice, from the grandest architectural details to the most intimate finishing touches, ensuring the experience is as seamless and enjoyable as the final result.</p>
          {/* Add more content here */}
        </div>
      </section>
    </main>
  );
}
