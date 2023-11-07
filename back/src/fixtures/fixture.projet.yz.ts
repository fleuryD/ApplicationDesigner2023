// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureProjetYZ(
	user: User,
	projectsService,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: projet: YZ - For user:", user.username)

	// ************** PROJECT **************
	const projectYz = await projectsService.create({
		name: "YzFixture",
		description: "",
		infos: "",
		isWip: "true",
		createdBy: user,
	})

	// ************** ENTITES **************

	const entitePartie = await entitesService.create({
		project: projectYz,
		name: "Partie",
		description: "",
		infos: "790",
		isWip: 790,
		umlPosX: 790,
		umlPosY: 60,
	})

	const entiteGrille = await entitesService.create({
		project: projectYz,
		name: "Grille",
		description: "",
		infos: "470",
		isWip: 470,
		umlPosX: 470,
		umlPosY: 470,
	})

	const entiteUser = await entitesService.create({
		project: projectYz,
		name: "User",
		description: "null",
		infos: "150",
		isWip: 150,
		umlPosX: 150,
		umlPosY: 10,
	})

	const entiteCoup = await entitesService.create({
		project: projectYz,
		name: "Coup",
		description: "",
		infos: "130",
		isWip: 130,
		umlPosX: 130,
		umlPosY: 620,
	})

	const entiteCombinaison = await entitesService.create({
		project: projectYz,
		name: "Combinaison",
		description: "",
		infos: "640",
		isWip: 640,
		umlPosX: 640,
		umlPosY: 900,
	})

	const entiteOrdre = await entitesService.create({
		project: projectYz,
		name: "Ordre",
		description: "",
		infos: "230",
		isWip: 230,
		umlPosX: 230,
		umlPosY: 810,
	})

	// ************** ATRRIBUTS for entite Partie **************

	await attributsService.create({
		entite: entitePartie,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "endedAt",
		tipe: "datetime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entitePartie,
		name: "players",
		tipe: "ManyToMany",
		position: 0,
		isWip: true,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		infos: "inutil si user est dans grille",
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Grille **************

	await attributsService.create({
		entite: entiteGrille,
		name: "player",
		tipe: "ManyToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	const attrGrilleCoups = await attributsService.create({
		entite: entiteGrille,
		name: "coups",
		tipe: "OneToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteCoup.id,
	})

	await attributsService.create({
		entite: entiteGrille,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrGrillePartie = await attributsService.create({
		entite: entiteGrille,
		name: "partie",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entitePartie.id,
	})

	// ************** ATRRIBUTS for entite User **************

	await attributsService.create({
		entite: entiteUser,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "email",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "username",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "password",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: true,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: "DateTime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: "DateTime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "parties",
		tipe: "ManyToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entitePartie.id,
	})

	// ************** ATRRIBUTS for entite Coup **************

	await attributsService.create({
		entite: entiteCoup,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	// ************** ATRRIBUTS for entite Combinaison **************

	await attributsService.create({
		entite: entiteCombinaison,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	// ************** ATRRIBUTS for entite Ordre **************

	await attributsService.create({
		entite: entiteOrdre,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	// ************** INVERSED BY **************
	/*
			attrPartiePlayers.inverseAttributId = attrUserParties.id
			await attributsService.save(attrPartiePlayers)

			attrUserParties.inverseAttributId = attrPartiePlayers.id
			await attributsService.save(attrUserParties)
			*/
}
