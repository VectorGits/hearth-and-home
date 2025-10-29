"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// Adjust the path if needed
const specialtyImage = '/images/interior-kitchen.png';

export default function OurSpecialty() {
	const specialtyTextRef = useRef<HTMLParagraphElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		if (!specialtyTextRef.current) return;

		const ctx = gsap.context(() => {
			gsap.to(specialtyTextRef.current, {
				duration: 1.5,
				scrambleText: {
					text: "Our Speciality",
					chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
					revealDelay: 0.2,
					speed: 0.4,
				},
				scrollTrigger: {
					trigger: specialtyTextRef.current,
					start: "top 80%",
					toggleActions: "play none none reset",
				},
			});
		});

		return () => ctx.revert();
	}, []);

	// Split h2 heading into characters and animate from right with stagger
	useEffect(() => {
		if (!headingRef.current) return;

		const el = headingRef.current;
		const original = el.innerHTML; // preserve the <br /> tag

		// Split text nodes into characters while preserving HTML tags
		const splitText = (node: Node): string => {
			if (node.nodeType === Node.TEXT_NODE) {
				return node.textContent!.split('').map(ch => 
					`<span class="char inline-block will-change-transform">${ch === ' ' ? '&nbsp;' : ch}</span>`
				).join('');
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				const element = node as HTMLElement;
				if (element.tagName === 'BR') {
					return '<br />';
				}
				return Array.from(element.childNodes).map(splitText).join('');
			}
			return '';
		};

		el.innerHTML = Array.from(el.childNodes).map(splitText).join('');

		const chars = Array.from(el.querySelectorAll<HTMLSpanElement>('.char'));

		const ctx = gsap.context(() => {
			gsap.fromTo(
				chars,
				{ x: 30, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					ease: 'power3.out',
					duration: 1,
					stagger: 0.06,
					scrollTrigger: {
						trigger: el,
						start: 'top 80%',
						toggleActions: 'play none none reset',
					},
				}
			);
		});

		// Cleanup: restore original HTML
		return () => {
			ctx.revert();
			el.innerHTML = original;
		};
	}, []);

	return (
		<section className="bg-background py-16 sm:py-24">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 items-center">
					{/* Image left, text right */}
					<div className="relative h-[350px] sm:h-[450px] lg:h-[600px] lg:col-span-6 rounded-lg overflow-hidden shadow-lg">
						<Image
							src={specialtyImage}
							alt="Elegant kitchen interior design with chandelier and table setting"
							fill
							className="object-cover object-top rounded-lg"
							sizes="(max-width: 1023px) 100vw, 50vw"
							priority
						/>
					</div>
					<div className="lg:col-span-6 flex flex-col justify-center px-0 lg:px-8 mt-8 lg:mt-0">
						<p ref={specialtyTextRef} className="font-raleway italic text-lg text-accent mb-2">
							{/* Initial empty, will be scrambled in by GSAP */}
						</p>
						<h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6 leading-tight">
							Full Home Turn-Key<br />Interior Design
						</h2>
						<p className="font-sans text-base md:text-lg text-muted-foreground mb-6">
							With a comprehensive, all-in-one approach, we provide everything necessary to transform your home into a space that is both luxurious and functional. Whether it’s a full-scale renovation or full-service design, our expert team handles every detail with precision and care.
						</p>
						<p className="font-sans text-base md:text-lg text-muted-foreground">
							From initial concepts to the finishing touch of styling, we design spaces that balance luxury and livability. Our meticulous attention to detail ensures that every seam, every stitch, and every surface works in perfect harmony, creating a home that feels effortlessly cohesive and completely tailored to you.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
