"use client"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

interface DogImageProps {
	breed: string
}
const NOT_FOUND = "/static/images/not_found.png"

export const DogImage = ({ breed }: DogImageProps) => {
	const [src, setSrc] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const onError = useCallback(() => {
		setSrc(NOT_FOUND)
	}, [])

	useEffect(() => {
		const fetchDogImage = async () => {
			setLoading(true)
			try {
				const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
				if (!response.ok) {
					setSrc(NOT_FOUND)
					throw new Error("Network response was not ok")
				}
				const data = await response.json()
				setSrc(data.message)
				setLoading(false)
			} catch (error) {
				console.log("error: ", error)
				setSrc(NOT_FOUND)
				setLoading(false)
			}
		}

		fetchDogImage()
	}, [breed])

	if (loading) {
		return <p>Loading...</p>
	}

	if (!src) {
		return <p>Imgage not exist</p>
	}

	return (
		<Image
			src={src}
			width={500}
			height={500}
			alt={breed}
			loading="lazy"
			unoptimized
			onError={onError}
		/>
	)
}

export default DogImage
