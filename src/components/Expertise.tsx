"use client";

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hook to detect mobile
function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const onResize = () => setIsMobile(window.innerWidth < breakpoint);
		onResize();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [breakpoint]);

	return isMobile;
}

const expertiseData = [
	{
		title: 'Full Service Interior Design',
		image: '/images/home-hearth-palm-beach-interior-24.jpg',
		description: 'Comprehensive design solutions for every room, tailored to your lifestyle and vision.',
		link: '/services/interior-design',
	},
	{
		title: 'Full Renovation & Design',
		image: '/images/home-hearth-miami-beach-penthouse-interior-01.jpg',
		description: 'Transform your space with expert renovation and design, from concept to completion.',
		link: '/services/renovation',
	},
	{
		title: 'New Build',
		image: '/images/home-hearth-palm-beach-interior-6.jpg',
		description: 'Create your dream home from the ground up with our new build expertise.',
		link: '/services/new-build',
	},
	{
		title: 'Commercial Design',
		image: '/images/home-hearth-commercial-interior-design.jpg',
		description: 'Elevate your business environment with modern, functional commercial design.',
		link: '/services/commercial',
	},
];

export default function Expertise() {
	const isMobile = useIsMobile(768);
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

	useLayoutEffect(() => {
		if (!sectionRef.current) return;

		const ctx = gsap.context(() => {
			const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

			if (!isMobile) {
				// Desktop: Staggered entrance from left to right when section enters viewport
				gsap.fromTo(
					cards,
					{
						opacity: 0,
						y: 70,
					},
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power3.out',
						stagger: 0.15,
						scrollTrigger: {
							trigger: sectionRef.current!,
							start: 'top top',
							// markers: true,
							once: false,
						},
					}
				);
			} else {
				// Mobile: Each card fades in individually as it enters viewport
				cards.forEach((card) => {
					gsap.fromTo(
						card,
						{
							opacity: 0,
							y: 30,
						},
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: card,
								start: 'top 55%',
								once: true,
							},
						}
					);
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [isMobile]);

	return (
		<section ref={sectionRef} className="bg-background py-16 sm:py-24">
			<div className="container mx-auto px-4">
				<h2 className="text-center font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-12 tracking-tight">Our Expertise</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{expertiseData.map((item, idx) => (
						<div 
							key={item.title} 
							ref={(el) => { cardRefs.current[idx] = el; }}
							className="group bg-card rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl"
						>
							<div className="relative h-64 w-full">
								<Image
									src={item.image}
									alt={item.title}
									fill
									className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
									sizes="(max-width: 1023px) 100vw, 25vw"
									priority={idx === 0}
								/>
							</div>
							<div className="flex-1 flex flex-col justify-between p-6">
								<h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
								<p className="font-sans text-muted-foreground text-sm md:text-base mb-4">{item.description}</p>
								<a href={item.link} className="font-raleway text-accent text-xs uppercase tracking-wider hover:underline self-start transition-colors">Learn more &gt;</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
