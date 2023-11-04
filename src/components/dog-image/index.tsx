"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface DogImageProps {
	breed: string
}

export const DogImage = ({ breed }: DogImageProps) => {
	const [src, setSrc] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchDogImage = async () => {
			setLoading(true)
			setError(null)
			try {
				const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				const data = await response.json()
				setSrc(data.message)
				setLoading(false)
			} catch (error) {
				const typedError = error as Error
				setError(typedError)
				setLoading(false)
			}
		}

		fetchDogImage()
	}, [breed])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>Error: {error.message}</p>
	}
	if (!src) {
		return <p>Imgage not exist</p>
	}

	return <Image src={src} width={500} height={500} alt={breed} loading="lazy" />
}

export default DogImage
