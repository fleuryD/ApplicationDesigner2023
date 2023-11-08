// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureProjetAD(
	user: User,
	projectsService,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: projet: AD - For user:", user.username)

	// ************** PROJECT **************
	const projectApplicationDesigner = await projectsService.create({
		name: "ApplicationDesignerFixture",
		description: null,
		infos: null,
		isWip: "false",
		createdBy: user,
	})

	// ************** ENTITES **************

	const entiteUser = await entitesService.create({
		project: projectApplicationDesigner,
		name: "User",
		description: null,
		infos: "10",
		isWip: 10,
		umlPosX: 10,
		umlPosY: 20,
	})

	const entiteProject = await entitesService.create({
		project: projectApplicationDesigner,
		name: "Project",
		description: null,
		infos: "399",
		isWip: 399,
		umlPosX: 399,
		umlPosY: 270,
	})

	const entiteEntite = await entitesService.create({
		project: projectApplicationDesigner,
		name: "Entite",
		description: null,
		infos: "690",
		isWip: 690,
		umlPosX: 690,
		umlPosY: 20,
	})

	const entiteAttribut = await entitesService.create({
		project: projectApplicationDesigner,
		name: "Attribut",
		description: null,
		infos: "1040",
		isWip: 1040,
		umlPosX: 1040,
		umlPosY: 10,
	})

	const entiteAdresse = await entitesService.create({
		project: projectApplicationDesigner,
		name: "Adresse",
		description: "",
		infos: "770",
		isWip: 770,
		umlPosX: 770,
		umlPosY: 610,
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

	const attrUserProjects = await attributsService.create({
		entite: entiteUser,
		name: "projects",
		tipe: "OneToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteProject.id,
	})

	// ************** ATRRIBUTS for entite Project **************

	await attributsService.create({
		entite: entiteProject,
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
		entite: entiteProject,
		name: "name",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	const attrProjectCreatedBy = await attributsService.create({
		entite: entiteProject,
		name: "createdBy",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteUser.id,
	})

	await attributsService.create({
		entite: entiteProject,
		name: "createdAt",
		tipe: "DateTime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteProject,
		name: "description",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteProject,
		name: "infos",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteProject,
		name: "isWip",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	const attrProjectEntites = await attributsService.create({
		entite: entiteProject,
		name: "entites",
		tipe: "OneToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteEntite.id,
	})

	const attrProjectAdresses = await attributsService.create({
		entite: entiteProject,
		name: "adresses",
		tipe: "OneToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteAdresse.id,
	})

	// ************** ATRRIBUTS for entite Entite **************

	await attributsService.create({
		entite: entiteEntite,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrEntiteProject = await attributsService.create({
		entite: entiteEntite,
		name: "project",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteProject.id,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "name",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "createdAt",
		tipe: "DateTime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "description",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "infos",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "isWip",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteEntite,
		name: "isFeminin",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	const attrEntiteAttributs = await attributsService.create({
		entite: entiteEntite,
		name: "attributs",
		tipe: "OneToMany",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteAttribut.id,
	})

	// ************** ATRRIBUTS for entite Attribut **************

	await attributsService.create({
		entite: entiteAttribut,
		name: "id",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})

	const attrAttributEntite = await attributsService.create({
		entite: entiteAttribut,
		name: "entite",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteEntite.id,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "name",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "createdAt",
		tipe: "DateTime",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "tipe",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "longueur",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "description",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "infos",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "position",
		tipe: "Int",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isWip",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isFeminin",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isNullable",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isUnique",
		tipe: "Boolean",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "targetEntiteId",
		tipe: "number",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "inverseAttributId",
		tipe: "number",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "defaut",
		tipe: "string",
		position: 0,
		isWip: true,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isPrivate",
		tipe: "boolean",
		position: 0,
		isWip: true,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		infos: "default ???",
	})

	await attributsService.create({
		entite: entiteAttribut,
		name: "isStatic",
		tipe: "boolean",
		position: 0,
		isWip: true,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
	})

	// ************** ATRRIBUTS for entite Adresse **************

	await attributsService.create({
		entite: entiteAdresse,
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
		entite: entiteAdresse,
		name: "url",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		longueur: 512,
	})

	await attributsService.create({
		entite: entiteAdresse,
		name: "name",
		tipe: "string",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: true,
		isUnique: false,
		infos: "FRONT_WEB | FRONT_LOCAL | BACK_WEB | BACK_LOCAL",
	})

	const attrAdresseProjet = await attributsService.create({
		entite: entiteAdresse,
		name: "projet",
		tipe: "ManyToOne",
		position: 0,
		isWip: false,
		isFeminin: false,
		isNullable: false,
		isUnique: false,
		targetEntiteId: entiteProject.id,
	})

	// ************** INVERSED BY **************

	attrUserProjects.inverseAttributId = attrProjectCreatedBy.id
	await attributsService.save(attrUserProjects)

	attrProjectCreatedBy.inverseAttributId = attrUserProjects.id
	await attributsService.save(attrProjectCreatedBy)

	attrProjectEntites.inverseAttributId = attrEntiteProject.id
	await attributsService.save(attrProjectEntites)

	attrProjectAdresses.inverseAttributId = attrAdresseProjet.id
	await attributsService.save(attrProjectAdresses)

	attrEntiteProject.inverseAttributId = attrProjectEntites.id
	await attributsService.save(attrEntiteProject)

	attrEntiteAttributs.inverseAttributId = attrAttributEntite.id
	await attributsService.save(attrEntiteAttributs)

	attrAttributEntite.inverseAttributId = attrEntiteAttributs.id
	await attributsService.save(attrAttributEntite)

	attrAdresseProjet.inverseAttributId = attrProjectAdresses.id
	await attributsService.save(attrAdresseProjet)
}
