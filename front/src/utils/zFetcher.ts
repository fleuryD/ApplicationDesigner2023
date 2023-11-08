// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { API_BASE_URL } from "./constants" // TODO : A mettre dans .env

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

type Props = {
	shortUrl: string
	method: string
	body?: any
	publicAccess?: boolean
}

export default async function zFetcher({ shortUrl, method, body, publicAccess }: Props) {
	const url = API_BASE_URL + shortUrl

	const requestOptions = {
		method,
		headers: publicAccess ? requestOptionsHeadersPublic() : requestOptionsHeaders(),
		body: body ? JSON.stringify(body) : null,
	}

	console.debug("🟨 [zFetcher] ➤➤ url:" + url + " ➤➤ requestOptions:", requestOptions)

	try {
		const response = await fetch(url, requestOptions)
		const rep = await response.json()
		if (rep?.statusCode >= 400) {
			console.error("❌ [zFetcher] ➤➤ rep", rep)
			return { ...rep, error: 1 }
		}
		console.debug("🟩 [zFetcher] ➤➤ rep:", rep)
		return rep
	} catch (err) {
		return { error: err }
	}
}

function requestOptionsHeaders() {
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: "Bearer " + localStorage.getItem("accessToken"), // TODO : A modifier
	}
}
function requestOptionsHeadersPublic() {
	return {
		"Content-Type": "application/json",
		Accept: "application/json",
	}
}
