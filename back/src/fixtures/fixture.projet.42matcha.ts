// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureProjetMatcha(
	user: User,
	projectsService,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: projet: 42 Matcha - For user:", user.username)

	// ************** PROJECT **************
	const projectMatcha = await projectsService.create({
		name: "MatchaFixture",
		description: "Site de rencontres pour Geeks",
		infos: "Projet de la spécialité Web de l’École 42",
		isWip: "false",
		createdBy: user,
	})

	// ************** ENTITES **************

	const entiteUser = await entitesService.create({
		project: projectMatcha,
		name: "User",
		description: null,
		infos: "10",
		isWip: 10,
		umlPosX: 10,
		umlPosY: 20,
	})

	const entiteMessage = await entitesService.create({
		project: projectMatcha,
		name: "Message",
		description: "",
		infos: "570",
		isWip: 570,
		umlPosX: 570,
		umlPosY: 20,
	})

	const entiteTag = await entitesService.create({
		project: projectMatcha,
		name: "Tag",
		description: "",
		infos: "580",
		isWip: 580,
		umlPosX: 580,
		umlPosY: 730,
	})

	const entiteTagUser = await entitesService.create({
		project: projectMatcha,
		name: "TagUser",
		description: "",
		infos: "280",
		isWip: 280,
		umlPosX: 280,
		umlPosY: 690,
	})

	const entiteLike = await entitesService.create({
		project: projectMatcha,
		name: "Like",
		description: "",
		infos: "630",
		isWip: 630,
		umlPosX: 630,
		umlPosY: 340,
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
		name: "isAdmin",
		tipe: "boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "birthday",
		tipe: "date",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "gender",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		infos: "F | M | NB",
		longueur: 10,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "loveM",
		tipe: "boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "loveF",
		tipe: "boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "loveNb",
		tipe: "boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "lastname",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "firstname",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "biography",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteUser,
		name: "height",
		tipe: "Integer",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
		infos: "en cm",
	})

	await attributsService.create({
		entite: entiteUser,
		name: "weight",
		tipe: "Integer",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
		infos: "en kg",
	})

	// ************** ATRRIBUTS for entite Message **************

	await attributsService.create({
		entite: entiteMessage,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrMessageSender = await attributsService.create({
		entite: entiteMessage,
		name: "sender",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	const attrMessageReceiver = await attributsService.create({
		entite: entiteMessage,
		name: "receiver",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteMessage,
		name: "content",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	// ************** ATRRIBUTS for entite Tag **************

	await attributsService.create({
		entite: entiteTag,
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
		entite: entiteTag,
		name: "name",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteTag,
		name: "category",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	// ************** ATRRIBUTS for entite TagUser **************

	await attributsService.create({
		entite: entiteTagUser,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrTagUserTag = await attributsService.create({
		entite: entiteTagUser,
		name: "tag",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteTag.id,
	})

	const attrTagUserUser = await attributsService.create({
		entite: entiteTagUser,
		name: "user",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	// ************** ATRRIBUTS for entite Like **************

	await attributsService.create({
		entite: entiteLike,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrLikeLiker = await attributsService.create({
		entite: entiteLike,
		name: "liker",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	const attrLikeLiked = await attributsService.create({
		entite: entiteLike,
		name: "liked",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	await attributsService.create({
		entite: entiteLike,
		name: "createdAt",
		tipe: "datetime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	// ************** INVERSED BY **************
}
