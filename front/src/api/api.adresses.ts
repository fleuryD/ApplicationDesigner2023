// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "utils/zFetcher"
import { Adresse } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchAdresses() {
	return await zFetcher({
		shortUrl: "/adresses",
		method: "GET",
	})
}

export async function apiFetchAdresseById(adresseId: number) {
	return zFetcher({
		shortUrl: "/adresses/" + adresseId,
		method: "GET",
	})
}

export async function apiCreateAdresse(adresse: Adresse) {
	return zFetcher({
		shortUrl: "/adresses/new",
		method: "POST",
		// body: { adresse }
		body: {
			url: adresse.url,
			name: adresse.name,
			// projet: adresse.projet,
		},
	})
}

export async function apiEditAdresse(adresse: Adresse) {
	return zFetcher({
		shortUrl: "/adresses/" + adresse.id + "/edit",
		method: "POST",
		// body: { adresse }
		body: {
			url: adresse.url,
			name: adresse.name,
			// projet: adresse.projet,
		},
	})
}

export async function apiDeleteAdresseById(adresseId: number) {
	return zFetcher({
		shortUrl: "/adresses/" + adresseId + "/delete",
		method: "DELETE",
	})
}
