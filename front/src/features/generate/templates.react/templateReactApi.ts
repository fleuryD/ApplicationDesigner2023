// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import { Attribut, Entite, AttrTipes } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
type Props = {
	entite: Entite | null
	entitePascalName: string
	entiteCamelName: string
	entiteCamelNamePluriel: string
}

export default function templateReactApi({ entite, entitePascalName, entiteCamelName, entiteCamelNamePluriel }: Props) {
	if (!entite) return null

	let strAttrs = ""
	entite.attributs.map((attr: Attribut) => {
		if (attr.name === "id") return null
		strAttrs += `			`
		if (
			attr.tipe === AttrTipes.OneToMany ||
			attr.tipe === AttrTipes.ManyToOne ||
			attr.tipe === AttrTipes.ManyToMany ||
			attr.name === "createdAt"
		)
			strAttrs += `// `
		strAttrs += `${attr.name}: xentite.${attr.name},\n`
		return strAttrs
	})

	let str = `// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "utils/zFetcher"
import { Xentite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiFetchXentites() {
	return await zFetcher({
		shortUrl: "/xentites",
		method: "GET",
	})
}

export async function apiFetchXentiteById(xentiteId:number) {
	return zFetcher({
		shortUrl: "/xentites/" + xentiteId,
		method: "GET",
	})
}

export async function apiCreateXentite(xentite:Xentite) {
	return zFetcher({
		shortUrl: "/xentites/new",
		method: "POST",
		// body: { xentite }
		body: {
${strAttrs}
		},
	})
}

export async function apiEditXentite(xentite:Xentite) {
	return zFetcher({
		shortUrl: "/xentites/" + xentite.id + "/edit",
		method: "POST",
		// body: { xentite }
		body: {
${strAttrs}
		},
	})
}

export async function apiDeleteXentiteById(xentiteId:number) {
	return zFetcher({
		shortUrl: "/xentites/" + xentiteId + "/delete",
		method: "DELETE",
	})
}





`

	str = str.replaceAll("Xentite", entitePascalName)
	str = str.replaceAll("xentites", entiteCamelNamePluriel)
	str = str.replaceAll("xentite", entiteCamelName)

	return {
		code: str,
		filePath: `./front/src/api/`,
		fileName: `api.${entiteCamelNamePluriel}.ts`,
		description: null,
	}
}
