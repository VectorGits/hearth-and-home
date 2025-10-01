import Image from 'next/image';
// Adjust the path if needed
const specialtyImage = '/images/interior-kitchen.png';

export default function OurSpecialty() {
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
						<p className="font-raleway italic text-lg text-accent mb-2">Our Speciality</p>
						<h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-semibold mb-6 leading-tight">
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
