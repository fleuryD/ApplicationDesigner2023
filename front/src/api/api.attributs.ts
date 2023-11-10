// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "libs/zFetcher"
import { Attribut } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiCreateAttribut(entiyId: number, attribut: Attribut) {
	return zFetcher({
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
			isPrimaryKey: attribut.isPrimaryKey,
			targetEntiteId: attribut.targetEntiteId,
			inverseAttributId: attribut.inverseAttributId,
		},
	})
}

export async function apiEditAttribut(attribut: Attribut) {
	return zFetcher({
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
			isPrimaryKey: attribut.isPrimaryKey,
			targetEntiteId: attribut.targetEntiteId,
			inverseAttributId: attribut.inverseAttributId,
		},
	})
}
export async function apiDeleteAttributById(attrId: number) {
	return zFetcher({
		shortUrl: "/attributs/" + attrId + "/delete",
		method: "DELETE",
	})
}
