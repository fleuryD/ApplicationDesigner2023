// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export async function fixtureProjetSL(
	user: User,
	projectsService,
	entitesService,
	attributsService
) {
	Logger.log("Fixtures:: projet: SL - For user:", user.username)

	// ************** PROJECT **************
	const projectSl = await projectsService.create({
		name: "SLFixture",
		description: null,
		infos: null,
		isWip: true,
		createdBy: user,
	})

	// ************** ENTITES **************

	const entiteUser = await entitesService.create({
		project: projectSl,
		name: "User",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 30,
		umlPosY: 30,
	})

	const entiteListeUser = await entitesService.create({
		project: projectSl,
		name: "ListeUser",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 440,
		umlPosY: 50,
	})

	const entiteListe = await entitesService.create({
		project: projectSl,
		name: "Liste",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 760,
		umlPosY: 40,
	})

	const entiteArticle = await entitesService.create({
		project: projectSl,
		name: "Article",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 340,
		umlPosY: 480,
	})

	const entiteRecipe = await entitesService.create({
		project: projectSl,
		name: "Recipe",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 1140,
		umlPosY: 220,
	})

	const entiteArticleRecipe = await entitesService.create({
		project: projectSl,
		name: "ArticleRecipe",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 780,
		umlPosY: 430,
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
		position: 2,
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
		position: 3,
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
		position: 4,
		isNullable: false,
		isUnique: false,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: "string",
		position: 5,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: "string",
		position: 6,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: "string",
		position: 7,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: "DateTime",
		position: 8,
		isNullable: true,
		isUnique: false,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: "DateTime",
		position: 9,
		isNullable: false,
		isUnique: false,
	})

	const attrUserListeUsers = await attributsService.create({
		entite: entiteUser,
		name: "listeUsers",
		tipe: "OneToMany",
		position: 10,
		targetEntiteId: entiteListeUser.id,
		//inverseAttributId,
	})

	// ************** Liste's Attributes **************
	const attListeId = await attributsService.create({
		entite: entiteListe,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteListe,
		name: "name",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrListeListeUsers = await attributsService.create({
		entite: entiteListe,
		name: "listeUsers",
		tipe: "OneToMany",
		position: 10,
		targetEntiteId: entiteListeUser.id,
		//inverseAttributId,
	})

	const attrListeArticles = await attributsService.create({
		entite: entiteListe,
		name: "articles",
		tipe: "OneToMany",
		position: 10,
		targetEntiteId: entiteArticle.id,
		//inverseAttributId: attrArticleListe.id,
	})

	const attrListeRecipes = await attributsService.create({
		entite: entiteListe,
		name: "recipes",
		tipe: "OneToMany",
		position: 10,
		targetEntiteId: entiteRecipe.id,
		//inverseAttributId: attrRecipeListe.id,
	})

	// ************** ListeUser's Attributes **************

	await attributsService.create({
		entite: entiteListeUser,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	const attrListeUserListe = await attributsService.create({
		entite: entiteListeUser,
		name: "liste",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteListe.id,
		inverseAttributId: attrUserListeUsers.id,
	})
	const attrListeUserUser = await attributsService.create({
		entite: entiteListeUser,
		name: "user",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteUser.id,
		inverseAttributId: attrListeListeUsers.id,
	})

	attrUserListeUsers.inverseAttributId = attrListeUserListe.id
	attrListeListeUsers.inverseAttributId = attrListeUserUser.id
	await attributsService.save(attrUserListeUsers)
	await attributsService.save(attrListeListeUsers)

	await attributsService.create({
		entite: entiteListeUser,
		name: "isOwner",
		tipe: "Boolean",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	// ************** Article's Attributes **************
	const attArticleId = await attributsService.create({
		entite: entiteArticle,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteArticle,
		name: "name",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrArticleListe = await attributsService.create({
		entite: entiteArticle,
		name: "liste",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteListe.id,
		inverseAttributId: attrListeArticles.id,
	})

	const attrArticleArticleRecipes = await attributsService.create({
		entite: entiteArticle,
		name: "articleRecipes",
		tipe: "OneToMany",
		position: 1,
		//targetEntiteId: entiteListe.id,
		//inverseAttributId: attrListeArticles.id,
	})

	attrListeArticles.inverseAttributId = attrArticleListe.id
	await attributsService.save(attrListeArticles)

	await attributsService.create({
		entite: entiteArticleRecipe,
		name: "inPanier",
		tipe: "Boolean",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	// ************** Recipe's Attributes **************

	const attRecipeId = await attributsService.create({
		entite: entiteRecipe,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteRecipe,
		name: "name",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrRecipeListe = await attributsService.create({
		entite: entiteRecipe,
		name: "liste",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteListe.id,
		inverseAttributId: attrListeRecipes.id,
	})

	attrListeRecipes.inverseAttributId = attrRecipeListe.id
	await attributsService.save(attrListeRecipes)

	const attrRecipeArticleRecipes = await attributsService.create({
		entite: entiteRecipe,
		name: "articleRecipes",
		tipe: "OneToMany",
		position: 1,
		//targetEntiteId: entiteListe.id,
		//inverseAttributId: attrListeArticles.id,
	})

	// ************** ArticleRecipe's Attributes **************

	await attributsService.create({
		entite: entiteArticleRecipe,
		name: "id",
		tipe: "Int",
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	const attrArticleRecipeArticle = await attributsService.create({
		entite: entiteArticleRecipe,
		name: "article",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteArticle.id,
		inverseAttributId: attrArticleArticleRecipes.id,
	})
	const attrArticleRecipeRecipe = await attributsService.create({
		entite: entiteArticleRecipe,
		name: "recipe",
		tipe: "ManyToOne",
		position: 1,
		targetEntiteId: entiteRecipe.id,
		inverseAttributId: attrRecipeArticleRecipes.id,
	})

	attrArticleArticleRecipes.targetEntiteId = entiteArticleRecipe.id
	attrArticleArticleRecipes.inverseAttributId = attrArticleRecipeArticle.id
	await attributsService.save(attrArticleArticleRecipes)

	attrRecipeArticleRecipes.targetEntiteId = entiteArticleRecipe.id
	attrRecipeArticleRecipes.inverseAttributId = attrArticleRecipeRecipe.id
	await attributsService.save(attrRecipeArticleRecipes)

	await attributsService.create({
		entite: entiteArticleRecipe,
		name: "quantity",
		tipe: "string",
		position: 1,
		isNullable: false,
		isUnique: false,
	})
	// ************** Xxxxxxxxxxxxxxx's Attributes **************
}
