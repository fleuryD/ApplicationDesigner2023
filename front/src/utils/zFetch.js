// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import { API_BASE_URL /* , geAccessToken */ } from "./constants" // ?????????????????
//import errorManager from "./errorManager"
import env from "react-dotenv"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// ! a mettre en TSX !!!!!!!!!!!!!!!!!!!!

// DEPRECATED : A remplacer par zFetcher

export default async function zFetch({ shortUrl, method, requierdFields, body, publicAccess }) {
	const url = env.BACk_BASE_URL + shortUrl

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
