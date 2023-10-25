// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import zFetch from "./zFetch"
import { zFetch2 } from "./zFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export async function apiFetchTest() {
	return zFetch({ shortUrl: "/test", method: "GET", requierdFields: [] })
}

// * ■■■■■■■■■■■■■■■■■■■■■ USERS

export async function apiFetchUsers() {
	return zFetch({
		shortUrl: "/users",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiFetchUser(userId) {
	return zFetch({
		shortUrl: "/users/" + userId,
		method: "GET",
		requierdFields: [],
	})
}

export async function apiFetchUserMe() {
	return zFetch({
		shortUrl: "/users/me",
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ AUTH

export async function apiFetchRegister({ username, email, password }) {
	return zFetch({
		publicAccess: true,
		shortUrl: "/auth/register",
		method: "POST",
		body: { username, email, password },
		requierdFields: [],
	})
}

export async function apiFetchLogin({ emailOrUsername, password }) {
	return zFetch({
		publicAccess: true,
		shortUrl: "/auth/login",
		method: "POST",
		body: { emailOrUsername, password },
		requierdFields: [],
	})
}

export async function apiFetchCheckEmail({ tokenEmail }) {
	console.log("apiFetchCheckEmail", tokenEmail)
	return zFetch({
		publicAccess: true,
		shortUrl: "/auth/confirm-email",
		method: "POST",
		body: { tokenEmail },
		requierdFields: [],
	})
}

export async function apiFetchForgottenPassword({ email }) {
	return zFetch({
		publicAccess: true,
		shortUrl: "/auth/forgotten-password",
		method: "POST",
		body: { email },
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■	PROJECT

export async function apiFetchProjects() {
	return zFetch({
		shortUrl: "/projects/my",
		method: "GET",
		requierdFields: [],
	})
}
export async function apiFetchProjects2() {
	const reponse = await zFetch2({
		shortUrl: "/projects/my",
		method: "GET",
		requierdFields: [],
	})
	console.warn("reponse", reponse)
	if (reponse.projects) return { projects: reponse.projects, error: null }
	if (reponse.error) return { projects: null, error: reponse.error }
	return { projects: null, error: null }
}

export async function apiFetchProject(projectId) {
	return zFetch({
		shortUrl: "/projects/" + projectId,
		method: "GET",
		requierdFields: [],
	})
}

export async function apiCreateProject(project) {
	return zFetch({
		shortUrl: "/projects/new",
		method: "POST",
		body: {
			name: project.name,
			description: project.description,
			infos: project.infos,
			isWip: project.isWip,
		},
		requierdFields: [],
	})
}

export async function apiEditProject(project) {
	return zFetch({
		shortUrl: "/projects/" + project.id + "/edit",
		method: "POST",
		body: {
			name: project.name,
			description: project.description,
			infos: project.infos,
			isWip: project.isWip,
		},
		requierdFields: [],
	})
}
export async function apiDeleteProject(projectId) {
	return zFetch({
		shortUrl: "/projects/" + projectId + "/delete",
		method: "DELETE",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■	ENTITE

export async function apiCreateEntity(projectId, entity) {
	return zFetch({
		shortUrl: "/entites/new/project/" + projectId,
		method: "POST",
		body: {
			name: entity.name,
			description: entity.description,
			infos: entity.infos,
			isWip: entity.isWip,
			isFeminin: entity.isFeminin,
		},
		requierdFields: [],
	})
}
export async function apiEditEntity(entity) {
	return zFetch({
		shortUrl: "/entites/" + entity.id + "/edit",
		method: "POST",
		body: {
			name: entity.name,
			description: entity.description,
			infos: entity.infos,
			isWip: entity.isWip,
			isFeminin: entity.isFeminin,
		},
		requierdFields: [],
	})
}
export async function apiDeleteEntity(entityId) {
	return zFetch({
		shortUrl: "/entites/" + entityId + "/delete",
		method: "DELETE",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■	ATTRIBUT

export async function apiCreateAttribut(entiyId, attribut) {
	return zFetch({
		shortUrl: "/attributs/new/entite/" + entiyId,
		method: "POST",
		body: {
			name: attribut.name,
			tipe: attribut.tipe,
			longueur: attribut.longueur,
			description: attribut.description,
			infos: attribut.infos,
			position: attribut.position,
			isWip: attribut.isWip,
			isFeminin: attribut.isFeminin,
			isNullable: attribut.isNullable,
			isUnique: attribut.isUnique,
			targetEntiteId: attribut.targetEntiteId,
			inverseAttributId: attribut.inverseAttributId,
		},
		requierdFields: [],
	})
}

export async function apiEditAttribut(attribut) {
	return zFetch({
		shortUrl: "/attributs/" + attribut.id + "/edit",
		method: "POST",
		body: {
			name: attribut.name,
			tipe: attribut.tipe,
			longueur: attribut.longueur,
			description: attribut.description,
			infos: attribut.infos,
			position: attribut.position,
			isWip: attribut.isWip,
			isFeminin: attribut.isFeminin,
			isNullable: attribut.isNullable,
			isUnique: attribut.isUnique,
			targetEntiteId: attribut.targetEntiteId,
			inverseAttributId: attribut.inverseAttributId,
		},
		requierdFields: [],
	})
}
export async function apiDeleteAttribut(attrId) {
	return zFetch({
		shortUrl: "/attributs/" + attrId + "/delete",
		method: "DELETE",
		requierdFields: [],
	})
}
// * ■■■■■■■■■■■■■■■■■■■■■	FIXTURES

export async function apiFixture(fixtureName) {
	return zFetch({
		shortUrl: "/fixtures/" + fixtureName,
		method: "GET",
		requierdFields: [],
	})
}
