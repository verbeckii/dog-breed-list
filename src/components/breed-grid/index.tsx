import React from "react"
import DogImage from "@/components/dog-image"
import { useSearchParams } from "next/navigation"

interface BreedGridProps {
	breeds: { [key: string]: string[] }
}

const BreedGrid = ({ breeds }: BreedGridProps) => {
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

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{Object.keys(allBreeds).map((breed) => (
				<div
					key={breed}
					className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-evenly"
				>
					<DogImage breed={breed} />
					<p className="mt-2 text-center">{breed}</p>
				</div>
			))}
		</div>
	)
}

export default BreedGrid
