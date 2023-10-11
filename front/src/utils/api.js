// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import zFetch from "./zFetch"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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

// * ■■■■■■■■■■■■■■■■■■■■■ LIKES

export async function apiFetchMyLikes() {
	return zFetch({
		shortUrl: "/likes/my-likes",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiLikeUser({ userId }) {
	return zFetch({
		shortUrl: "/likes/like-user",
		method: "POST",
		body: {
			userId,
		},
		requierdFields: [],
	})
}
export async function apiUnLikeUser({ userId }) {
	return zFetch({
		shortUrl: "/likes/unlike-user",
		method: "POST",
		body: {
			userId,
		},
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ TAGS

export async function apiFetchTags() {
	return zFetch({
		shortUrl: "/tags/",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiFetchMyTags() {
	return zFetch({
		shortUrl: "/tags/my-tags",
		method: "GET",
		requierdFields: [],
	})
}

export async function apiAddTag({ tagId }) {
	return zFetch({
		shortUrl: "/tags/add/" + tagId,
		method: "GET",
		requierdFields: [],
	})
}
export async function apiRemoveTag({ tagId }) {
	return zFetch({
		shortUrl: "/tags/remove/" + tagId,
		method: "GET",
		requierdFields: [],
	})
}

// * ■■■■■■■■■■■■■■■■■■■■■ AUTH

export async function apiFetchRegister({
	username,
	email,
	password,
	firstname,
	lastname,
	birthday,
	gender,
	loveM,
	loveF,
	loveNB,
}) {
	return zFetch({
		shortUrl: "/auth/register",
		method: "POST",
		body: {
			username,
			email,
			password,
			firstname,
			lastname,
			birthday,
			gender,
			loveM,
			loveF,
			loveNB,
		},
		requierdFields: [],
	})
}

export async function apiFetchLogin({ emailOrUsername, email, password }) {
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
