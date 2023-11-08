// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { useState, useEffect } from "react"
import zFetcher from "utils/zFetcher"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*
 * *****************************************************************************
 *
 *	USAGE:
 *	const { projects, setProjects, isLoading, fetchError } = useZFetchMyProjects()
 *
 */
export const useZFetchMyProjects = () => {
	const [projects, setProjects] = useState<Project[] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [fetchError, setFetchError] = useState<any | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			await zFetcher({
				shortUrl: "/projects/my",
				method: "GET",
				// body: {},
				//publicAccess: false
			}).then((rep) => {
				if (rep.projects) setProjects(rep.projects)
				else setFetchError(rep)
				setIsLoading(false)
			})
		}
		fetchData()
	}, [])
	return { projects, setProjects, isLoading, fetchError }
}

/*
 * *****************************************************************************
 *
 *	USAGE:
 *	const { project, setProject, isLoading, fetchError } = useZFetchMyProjectById(projectId)
 *
 */
export const useZFetchMyProjectById = (projectId: number) => {
	const [project, setProject] = useState<Project | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [fetchError, setFetchError] = useState<any | null>(null)

	useEffect(() => {
		document.title = "AD..."
		const fetchData = async () => {
			setIsLoading(true)
			await zFetcher({
				shortUrl: "/projects/" + projectId,
				method: "GET",
				// body: {},
				//publicAccess: false
			}).then((rep) => {
				if (rep.project) {
					setProject(rep.project)
					document.title = "AD: " + rep.project.name
				} else setFetchError(rep)
				setIsLoading(false)
			})
		}
		fetchData()
	}, [projectId])
	return { project, setProject, isLoading, fetchError }
}

/*
export async function apiFetchMyProjects() {
	return await zFetcher({
		shortUrl: "/projects/my",
		method: "GET",
	})
}

export async function apiFetchProjectById(projectId: number) {
	return zFetcher({
		shortUrl: "/projects/" + projectId,
		method: "GET",
	})
}
*/
export async function apiCreateProject(project: Project) {
	return zFetcher({
		shortUrl: "/projects/new",
		method: "POST",
		// body: { project }
		body: {
			name: project.name,
			description: project.description,
			infos: project.infos,
			isWip: project.isWip,
		},
	})
}

export async function apiEditProject(project: Project) {
	return zFetcher({
		shortUrl: "/projects/" + project.id + "/edit",
		method: "POST",
		body: {
			name: project.name,
			description: project.description,
			infos: project.infos,
			isWip: project.isWip,
		},
	})
}
export async function apiDeleteProjectById(projectId: number) {
	return zFetcher({
		shortUrl: "/projects/" + projectId + "/delete",
		method: "DELETE",
	})
}
