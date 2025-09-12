// components/BackgroundImage.tsx

import Image from 'next/image';

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src="/images/interior-hero.jpg"
        alt="Elegant interior design of a living room"
        fill
        className="object-cover"
        quality={80}
        priority
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}