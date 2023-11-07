// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"
import { Project } from "../projects"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureEntiteUser(
	user: User,
	project: Project,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: entite: User - For user:", user.username)

	// ************** ENTITES **************

	const entiteUser = await entitesService.create({
		project: project,
		name: "User",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 10,
		umlPosY: 20,
	})

	// ************** User's Attributes **************
	const attUserId = await attributsService.create({
		entite: entiteUser,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "email",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: true,
	})

	const attUserName = await attributsService.create({
		entite: entiteUser,
		name: "username",
		tipe: "string",
		longueur: null,
		description: null,
		infos: null,
		position: 1,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		//targetEntiteId,
		//inverseAttributId,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "password",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: "string",
		position: 1,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: "string",
		position: 1,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: "string",
		position: 1,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: "DateTime",
		position: 1,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: "DateTime",
		position: 1,
		isNullable: false,
		isUnique: false,
	})
}
