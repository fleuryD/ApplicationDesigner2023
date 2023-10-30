// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "utils/zFetcher"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchUsers() {
	return zFetcher({
		shortUrl: "/users",
		method: "GET",
	})
}

export async function apiFetchUser(userId:number) {
	return zFetcher({
		shortUrl: "/users/" + userId,
		method: "GET",
	})
}

export async function apiFetchUserMe() {
	return zFetcher({
		shortUrl: "/users/me",
		method: "GET",
	})
}

