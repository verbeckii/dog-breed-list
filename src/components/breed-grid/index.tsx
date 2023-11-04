"use client"
import React from "react"
import DogImage from "@/components/dog-image"
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"

interface BreedGridProps {
	breeds: { [key: string]: string[] }
}

const BreedGrid = ({ breeds }: BreedGridProps) => {
	const [visibleCards, setVisibleCards] = useState(20)
	const lastVisibleCardRef = useRef(null)
	const searchParams = useSearchParams()
	const selectedBreed = searchParams.get("breed")
	const selectedSubBreed = searchParams.get("subBreed")
	let allBreeds = breeds

	if (selectedBreed) {
		if (breeds[selectedBreed].length > 0) {
			breeds[selectedBreed].forEach((subBreed) => {
				allBreeds = {
					...allBreeds,
					[subBreed]: [],
				}
			})
		}
	}
	if (selectedSubBreed) {
		allBreeds = {
			...breeds,
			[selectedSubBreed]: [],
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					// Load more cards when the last card is in the viewport
					setVisibleCards((prevVisibleCards) => prevVisibleCards + 20)
				}
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			},
		)
		const lastCardRef = lastVisibleCardRef.current

		if (lastCardRef) {
			observer.observe(lastCardRef)
		}

		return () => {
			if (lastCardRef) {
				observer.unobserve(lastCardRef)
			}
		}
	}, [lastVisibleCardRef])

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{Object.keys(allBreeds)
				.slice(0, visibleCards)
				.map((breed, index) => {
					// Attach a ref to the last visible card
					if (index === visibleCards - 1) {
						return (
							<div
								key={breed}
								ref={lastVisibleCardRef}
								className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-evenly"
							>
								<DogImage breed={breed} />
								<p className="mt-2 text-center">{breed}</p>
							</div>
						)
					}
					return (
						<div
							key={breed}
							className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-evenly"
						>
							<DogImage breed={breed} />
							<p className="mt-2 text-center">{breed}</p>
						</div>
					)
				})}
		</div>
	)
}

export default BreedGrid
