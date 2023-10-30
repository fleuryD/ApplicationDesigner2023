// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "utils/zFetcher"
import { Project } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


export async function apiFetchMyProjects() {
	return await zFetcher({
		shortUrl: "/projects/my",
		method: "GET",
	})
}

export async function apiFetchProjectById(projectId:number) {
	return zFetcher({
		shortUrl: "/projects/" + projectId,
		method: "GET",
	})
}

export async function apiCreateProject(project:Project) {
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

export async function apiEditProject(project:Project) {
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
export async function apiDeleteProjectById(projectId:number) {
	return zFetcher({
		shortUrl: "/projects/" + projectId + "/delete",
		method: "DELETE",
	})
}
