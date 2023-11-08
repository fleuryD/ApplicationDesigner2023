// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { useState, useEffect } from "react"
import { apiFetchMyProjects } from "api"
import zFetcher from "utils/zFetcher"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	shortUrl: string
	method: string
	body?: any
	publicAccess?: boolean
}

export const useZFetch = ({ shortUrl, method, body, publicAccess }: Props) => {
	const [data, setData] = useState<any | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [fetchResponseError, setError] = useState<any | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)

			try {
				await zFetcher({
					shortUrl,
					method,
					body,
					publicAccess,
				}).then((rep) => {
					//if (!rep.ok) throw new Error(rep.statusText)
					setData(rep)
					//else setError(rep)
					setIsLoading(false)
				})

				/*
				const response = await fetch(url)
				const json = await response.json()
				setIsLoading(false)
				setData(json)
				setError(null)
				*/
			} catch (error) {
				console.log("catch:", error)
				setError(`${error} Could not Fetch Data `)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [shortUrl, method, body, publicAccess])
	return { data, setData, isLoading, fetchResponseError }
}
/*
export const useZFetchHome = () => {
	const {
		data,
		setData: setProjects,
		isLoading,
		fetchResponseError,
	} = useZFetch({
		shortUrl: "/projects/my",
		method: "GET",
	})

	return { projects: data?.projects, setProjects, isLoading, fetchResponseError }
}
*/

export const useZFetchHome = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				await zFetcher({
					shortUrl: "/projects/my",
					method: "GET",
					// body: {},
				}).then((rep) => {
					if (rep.projects) setProjects(rep.projects)
					else setFetchResponseError(rep)
					setIsLoading(false)
				})
			} catch (error) {
				setFetchResponseError(`${error} Could not Fetch Data `)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])
	return { projects, setProjects, isLoading, fetchResponseError }
}
/*
export const useZFetchHome1 = () => {
	const [projects, setProjects] = useState<Project[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [fetchResponseError, setFetchResponseError] = useState<any | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				apiFetchMyProjects().then((rep) => {
					if (rep.projects) setProjects(rep.projects)
					else setFetchResponseError(rep)
					setIsLoading(false)
				})

				/ *
				const response = await fetch(url)
				if (!response.ok) throw new Error(response.statusText)
				const json = await response.json()
				setIsPending(false)
				setData(json)
				setError(null)
				* /
			} catch (error) {
				setFetchResponseError(`${error} Could not Fetch Data `)
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])
	return { projects, setProjects, isLoading, fetchResponseError }

}
	*/
