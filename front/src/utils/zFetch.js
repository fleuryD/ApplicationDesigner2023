// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import { API_BASE_URL /* , geAccessToken */ } from "./constants" // ?????????????????
//import errorManager from "./errorManager"
import ErrorSessionExpired from "../ui/ErrorSessionExpired"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

export default async function zFetch({ shortUrl, method, requierdFields, body, publicAccess }) {
	const url = API_BASE_URL + shortUrl

	const requestOptions = {
		method,
		headers: publicAccess ? requestOptionsHeadersPublic() : requestOptionsHeaders(),
		body: body ? JSON.stringify(body) : null,
	}

	console.debug("🟨 zFetch ➤➤ url:" + url + " ➤➤ requestOptions:", requestOptions)

	try {
		const response = await fetch(url, requestOptions)
		const rep = await response.json()

		const missingElements = []

		if (rep?.statusCode >= 400) {
			console.error("❌ rep:", rep)
			let errorPublicMessage = null
			return { ...rep, error: 1, errorPublicMessage }
		}

		requierdFields.forEach((elem) => {
			if (!rep[elem]) {
				missingElements.push(elem)
			}
		})

		if (missingElements.length === 0) {
			console.log("🟩 zFetch.success ➤➤ rep:", rep)
			console.groupEnd()
			return rep
		}

		console.log("❌ missingElements", missingElements)
		return { error: rep }
	} catch (err) {
		return { error: err }
	}
}

export async function zFetch2({ shortUrl, method, body, publicAccess }) {
	const url = API_BASE_URL + shortUrl

	const requestOptions = {
		method,
		headers: publicAccess ? requestOptionsHeadersPublic() : requestOptionsHeaders(),
		body: body ? JSON.stringify(body) : null,
	}

	console.debug("🟨 zFetch ➤➤ url:" + url + " ➤➤ requestOptions:", requestOptions)

	try {
		const response = await fetch(url, requestOptions)
		const rep = await response.json()

		if (rep?.statusCode >= 400) {
			console.error("❌ zFetch2::rep.statusCode >= 400:", rep)
			if (rep.message === "ERROR_ACCESS_TOKEN_EXPIRED") return { error: <ErrorSessionExpired /> }

			console.error("❌ ERROR_ACCESS_TOKEN_EXPIRED")
			let errorPublicMessage = null
			return { ...rep, error: 1, errorPublicMessage }
		}

		console.log("🟩 zFetch.success ➤➤ rep:", rep)
		console.groupEnd()
		return rep
	} catch (err) {
		return { error: err }
	}
}
// ### PRIVATE ################################################################

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
