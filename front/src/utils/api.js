// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import zFetch from "./zFetch"

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

export async function apiFetchRegister({
	username,
	email,
	password,
	/*
	firstname,
	lastname,
	birthday,
	gender,
	*/
}) {
	return zFetch({
		shortUrl: "/auth/register",
		method: "POST",
		body: {
			username,
			email,
			password,
			/*
			firstname,
			lastname,
			birthday,
			gender,
			*/
		},
		requierdFields: [],
	})
}

export async function apiFetchLogin({ emailOrUsername, password }) {
	return zFetch({
		shortUrl: "/auth/login",
		method: "POST",
		body: {
			emailOrUsername,
			password,
		},
		requierdFields: [],
	})
}

export async function apiFetchCheckEmail({ tokenEmail }) {
	return zFetch({
		shortUrl: "/auth/check-email",
		method: "POST",
		body: {
			tokenEmail,
		},
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchProjects() {
	return zFetch({
		shortUrl: "/projects/my",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiFetchProject(projectId) {
	return zFetch({
		shortUrl: "/projects/" + projectId,
		method: "GET",
		requierdFields: [],
	})
}
