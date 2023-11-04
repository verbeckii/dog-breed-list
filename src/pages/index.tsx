import { Inter } from "next/font/google"
import { getDogList } from "@/shared/api/dog-list"
import BreedGrid from "@/components/breed-grid"
import BreedSelector from "@/components/breed-selector"
import { useSearchParams } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

interface HomeProps {
	dogList: { [key: string]: string[] }
}

export default function Home({ dogList }: HomeProps) {
	const searchParams = useSearchParams()
	const search = searchParams.get("breed")
	let filteredData = dogList
	if (search) {
		filteredData = {
			[search]: dogList[search],
		}
	}

	return (
		<main className={`container mx-auto p-4 ${inter.className}`}>
			<BreedSelector breeds={dogList} />
			<BreedGrid breeds={filteredData} />
		</main>
	)
}

export async function getServerSideProps() {
	const response = await getDogList()
	const dogList = response.message
	return { props: { dogList } }
}
