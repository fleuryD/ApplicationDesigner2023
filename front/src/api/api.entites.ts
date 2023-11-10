// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import zFetcher from "libs/zFetcher"
import { Entite } from "types"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

export async function apiCreateEntity(projectId: number, entity: Entite) {
	return zFetcher({
		shortUrl: "/entites/new/project/" + projectId,
		method: "POST",
		body: {
			name: entity.name,
			description: entity.description,
			infos: entity.infos,
			isWip: entity.isWip,
			isFeminin: entity.isFeminin,
		},
	})
}

export async function apiEditEntity(entity: Entite) {
	return zFetcher({
		shortUrl: "/entites/" + entity.id + "/edit",
		method: "POST",
		body: {
			name: entity.name,
			description: entity.description,
			infos: entity.infos,
			isWip: entity.isWip,
			isFeminin: entity.isFeminin,
		},
	})
}

export async function apiDeleteEntityById(entityId: number) {
	return zFetcher({
		shortUrl: "/entites/" + entityId + "/delete",
		method: "DELETE",
	})
}

export async function apiSetEntiteUmlPosition(entityId: number, posX: number, posY: number) {
	console.log("BBBBBBBBBBBBBBBBBBBBBBBb", posX, posY)
	return zFetcher({
		shortUrl: "/entites/set-uml-position/" + entityId,
		method: "POST",
		body: {
			posX,
			posY,
		},
	})
}
