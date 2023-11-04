export async function getDogList() {
	const res = await fetch("https://dog.ceo/api/breeds/list/all")
	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}
	const data = res.json()
	return data
}
