// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "libs/zFetcher"
// import { User } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchTest() {
	return zFetcher({ shortUrl: "/test", method: "GET" })
}

export async function apiFixture(fixtureName: string) {
	return zFetcher({
		shortUrl: "/fixtures/" + fixtureName,
		method: "GET",
	})
}
