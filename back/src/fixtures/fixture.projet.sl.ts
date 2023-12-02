// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Logger } from "@nestjs/common"
import { User } from "../users"
import { AttrTipes } from "../attributs"

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

	const entiteCollectionUser = await entitesService.create({
		project: projectSl,
		name: "CollectionUser",
		description: null,
		infos: null,
		isWip: false,
		umlPosX: 440,
		umlPosY: 50,
	})

	const entiteCollection = await entitesService.create({
		project: projectSl,
		name: "Collection",
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
		position: 2,
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
		tipe: AttrTipes.VarChar,
		position: 4,
		isNullable: false,
		isUnique: false,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "accessToken",
		tipe: AttrTipes.VarChar,
		position: 5,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "emailValidationToken",
		tipe: AttrTipes.VarChar,
		position: 6,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetToken",
		tipe: AttrTipes.VarChar,
		position: 7,
		isNullable: true,
		isUnique: true,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "passwordResetAt",
		tipe: AttrTipes.DateTime,
		position: 8,
		isNullable: true,
		isUnique: false,
	})
	await attributsService.create({
		entite: entiteUser,
		name: "createdAt",
		tipe: AttrTipes.DateTime,
		position: 9,
		isNullable: false,
		isUnique: false,
	})

	const attrUserCollectionUsers = await attributsService.create({
		entite: entiteUser,
		name: "collectionUsers",
		tipe: AttrTipes.OneToMany,
		position: 10,
		targetEntiteId: entiteCollectionUser.id,
		//inverseAttributId,
	})

	// ************** Collection's Attributes **************
	const attCollectionId = await attributsService.create({
		entite: entiteCollection,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteCollection,
		name: "name",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrCollectionCollectionUsers = await attributsService.create({
		entite: entiteCollection,
		name: "collectionUsers",
		tipe: AttrTipes.OneToMany,
		position: 10,
		targetEntiteId: entiteCollectionUser.id,
		//inverseAttributId,
	})

	const attrCollectionArticles = await attributsService.create({
		entite: entiteCollection,
		name: "articles",
		tipe: AttrTipes.OneToMany,
		position: 10,
		targetEntiteId: entiteArticle.id,
		//inverseAttributId: attrArticleCollection.id,
	})

	const attrCollectionRecipes = await attributsService.create({
		entite: entiteCollection,
		name: "recipes",
		tipe: AttrTipes.OneToMany,
		position: 10,
		targetEntiteId: entiteRecipe.id,
		//inverseAttributId: attrRecipeCollection.id,
	})

	// ************** CollectionUser's Attributes **************

	await attributsService.create({
		entite: entiteCollectionUser,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	const attrCollectionUserCollection = await attributsService.create({
		entite: entiteCollectionUser,
		name: "collection",
		tipe: AttrTipes.ManyToOne,
		position: 1,
		targetEntiteId: entiteCollection.id,
		inverseAttributId: attrUserCollectionUsers.id,
	})
	const attrCollectionUserUser = await attributsService.create({
		entite: entiteCollectionUser,
		name: "user",
		tipe: AttrTipes.ManyToOne,
		position: 1,
		targetEntiteId: entiteUser.id,
		inverseAttributId: attrCollectionCollectionUsers.id,
	})

	attrUserCollectionUsers.inverseAttributId = attrCollectionUserCollection.id
	attrCollectionCollectionUsers.inverseAttributId = attrCollectionUserUser.id
	await attributsService.save(attrUserCollectionUsers)
	await attributsService.save(attrCollectionCollectionUsers)

	await attributsService.create({
		entite: entiteCollectionUser,
		name: "isOwner",
		tipe: AttrTipes.Boolean,
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	// ************** Article's Attributes **************
	const attArticleId = await attributsService.create({
		entite: entiteArticle,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteArticle,
		name: "name",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrArticleCollection = await attributsService.create({
		entite: entiteArticle,
		name: "collection",
		tipe: AttrTipes.ManyToOne,
		position: 1,
		targetEntiteId: entiteCollection.id,
		inverseAttributId: attrCollectionArticles.id,
	})

	const attrArticleArticleRecipes = await attributsService.create({
		entite: entiteArticle,
		name: "articleRecipes",
		tipe: AttrTipes.OneToMany,
		position: 1,
		//targetEntiteId: entiteCollection.id,
		//inverseAttributId: attrCollectionArticles.id,
	})

	attrCollectionArticles.inverseAttributId = attrArticleCollection.id
	await attributsService.save(attrCollectionArticles)

	// ************** Recipe's Attributes **************

	const attRecipeId = await attributsService.create({
		entite: entiteRecipe,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	await attributsService.create({
		entite: entiteRecipe,
		name: "name",
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: false,
	})

	const attrRecipeCollection = await attributsService.create({
		entite: entiteRecipe,
		name: "collection",
		tipe: AttrTipes.ManyToOne,
		position: 1,
		targetEntiteId: entiteCollection.id,
		inverseAttributId: attrCollectionRecipes.id,
	})

	attrCollectionRecipes.inverseAttributId = attrRecipeCollection.id
	await attributsService.save(attrCollectionRecipes)

	const attrRecipeArticleRecipes = await attributsService.create({
		entite: entiteRecipe,
		name: "articleRecipes",
		tipe: AttrTipes.OneToMany,
		position: 1,
		//targetEntiteId: entiteCollection.id,
		//inverseAttributId: attrCollectionArticles.id,
	})

	// ************** ArticleRecipe's Attributes **************

	await attributsService.create({
		entite: entiteArticleRecipe,
		name: "id",
		tipe: AttrTipes.Integer,
		position: 1,
		isNullable: false,
		isUnique: true,
		isPrimaryKey: true,
	})
	const attrArticleRecipeArticle = await attributsService.create({
		entite: entiteArticleRecipe,
		name: "article",
		tipe: AttrTipes.ManyToOne,
		position: 1,
		targetEntiteId: entiteArticle.id,
		inverseAttributId: attrArticleArticleRecipes.id,
	})
	const attrArticleRecipeRecipe = await attributsService.create({
		entite: entiteArticleRecipe,
		name: "recipe",
		tipe: AttrTipes.ManyToOne,
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
		tipe: AttrTipes.VarChar,
		position: 1,
		isNullable: false,
		isUnique: false,
	})
	// ************** Xxxxxxxxxxxxxxx's Attributes **************
}
