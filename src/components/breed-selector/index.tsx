"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface BreedSelectorProps {
	breeds: { [key: string]: string[] }
}

const BreedSelector = ({ breeds }: BreedSelectorProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const breed = searchParams.get("breed")
	const subBreed = searchParams.get("subBreed")

	const onSelectBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const current = new URLSearchParams(searchParams)
		const value = event.target.value.trim()
		if (!value) {
			current.delete("breed")
			current.delete("subBreed")
		} else {
			current.set("breed", value)
			current.delete("subBreed")
		}
		const search = current.toString()
		const query = search ? `?${search}` : ""
		router.push(`${pathname}${query}`)
	}
	const onSelectSubBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const current = new URLSearchParams(searchParams)
		const value = event.target.value.trim()
		if (!value) {
			current.delete("subBreed")
		} else {
			current.set("subBreed", event.target.value)
		}
		const search = current.toString()
		const query = search ? `?${search}` : ""
		router.push(`${pathname}${query}`)
	}

	return (
		<div className="mb-4">
			<select onChange={onSelectBreed} value={breed || ""} className="p-2 border rounded-md">
				<option value="">Select Breed</option>
				{Object.keys(breeds).map((breed) => (
					<option key={breed} value={breed}>
						{breed}
					</option>
				))}
			</select>

			{breed && breeds[breed].length > 0 && (
				<select
					onChange={onSelectSubBreed}
					value={subBreed || ""}
					className="p-2 border rounded-md ml-2"
				>
					<option value="">Select Sub-Breed</option>
					{breeds[breed].map((subBreed) => (
						<option key={subBreed} value={subBreed}>
							{subBreed}
						</option>
					))}
				</select>
			)}
		</div>
	)
}

export default BreedSelector
