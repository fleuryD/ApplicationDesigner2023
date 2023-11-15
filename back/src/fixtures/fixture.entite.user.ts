// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"
import { Project } from "../projects"
import { AttrTipes } from "../attributs"

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
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "email",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: true,
	})

	const attUserName = await attributsService.create({
		entite: entiteUser,
		name: "username",
		tipe: AttrTipes.VarChar,
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
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: AttrTipes.DateTime,
		position: 1,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 1,
		isNullable: false,
		isUnique: false,
	})
}
