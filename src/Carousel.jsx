import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

function SlideDots({ count, select, embla }) {
	return (
		<div className="flex space-x-3 mt-4">
			{Array.from({ length: count }).map((_, idx) => {
				return (
					<button
						key={idx}
						onClick={() => embla && embla.scrollTo(idx)}
						className={`w-3 h-3 rounded-full cursor-pointer ${
							idx === select ? "bg-purple-50" : "bg-purple-600 opacity-30"
						}`}
					></button>
				);
			})}
		</div>
	);
}

function useCarousel(childrenCount) {
	const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
	const [selected, setSelected] = useState(0);

	useEffect(() => {
		if (!embla) return;

		const updateSlides = () => {
			const slides = embla.slideNodes();
			const selectedIndex = embla.selectedScrollSnap();
			setSelected(selectedIndex);

			slides.forEach((slide, idx) => {
				if (selectedIndex === idx) {
					slide.classList.remove("opacity-40");
					slide.classList.add("opacity-100");
				} else {
					slide.classList.remove("opacity-100");
					slide.classList.add("opacity-40");
				}
			});
		};

		embla.on("select", updateSlides);
		embla.on("scroll", updateSlides);
		updateSlides();

		return () => {
			embla.off("select", updateSlides);
			embla.off("scroll", updateSlides);
		};
	}, [embla, childrenCount]);

	return [emblaRef, selected, embla];
}

function Carousel({ children }) {
	const childrenCount = React.Children.count(children);
	const [emblaRef, selected, embla] = useCarousel(childrenCount);

	return (
		<>
			<div
				className="overflow-hidden w-full max-w-xl xl:max-w-2xl"
				ref={emblaRef}
			>
				<div className="embla__container">{children}</div>
			</div>
			<SlideDots count={childrenCount} select={selected} embla={embla} />
		</>
	);
}

export default Carousel;
