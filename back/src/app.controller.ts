// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Request,
	UseGuards,
} from "@nestjs/common"
import { AppService } from "./app.service"
import { ProjectsService } from "./projects/projects.service"
import { EntitesService } from "./entites/entites.service"
import { AttributsService } from "./attributs/attributs.service"
import { Logger } from "@nestjs/common"
import { UserFromToken } from "./auth/user-from-token.decorator"
//import { UsersService } from "./users"
import { UsersService } from "./users/users.service"
import { Public } from "./auth/jwt-auth.guard"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly projectsService: ProjectsService,
		private readonly entitesService: EntitesService,
		private readonly attributsService: AttributsService,
		private readonly usersService: UsersService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Get("")
	@Public()
	async home() {
		return "Hello"
	}

	@Get("/fixtures/entite/:id/attribut-id")
	async fixtureAttributId(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)
		this.appService.fixtureTest(user)
		Logger.log("🟠 /fixtures/entite/:id/attribut-id - For user:", user.username)

		try {
			await this.entitesService.ensureAuthorizedAccessEntite({
				userId: userFromToken.id,
				entiteId: params.id,
			})

			const entite = await this.entitesService.findOneById(params.id)

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entite,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project/:id/entite-user")
	async fixtureEntiteUser(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/project/:id/entite-user - For user:", user.username)

		try {
			await this.projectsService.ensureAuthorizedAccessProject({
				userId: userFromToken.id,
				projectId: params.id,
			})

			const project = await this.projectsService.findOneById(params.id)

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: project,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: true,
			})

			const attUserName = await this.attributsService.create({
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
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-ad")
	async fixtureProjetAD(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/ad - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectAd = await this.projectsService.create({
				name: "ApplicationDesigner",
				description: null,
				infos: null,
				isWip: false,
				createdBy: user,
			})

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: projectAd,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
			})

			const entiteProject = await this.entitesService.create({
				project: projectAd,
				name: "Project",
				description: null,
				infos: null,
				isWip: false,
			})

			const entiteEntite = await this.entitesService.create({
				project: projectAd,
				name: "Entite",
				description: null,
				infos: null,
				isWip: false,
			})

			const entiteAttribut = await this.entitesService.create({
				project: projectAd,
				name: "Attribut",
				description: null,
				infos: null,
				isWip: false,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 2,
				isNullable: false,
				isUnique: true,
			})

			const attUserName = await this.attributsService.create({
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
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 4,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 5,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 6,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 7,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 8,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 9,
				isNullable: false,
				isUnique: false,
			})

			const attrUserProjects = await this.attributsService.create({
				entite: entiteUser,
				name: "projects",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteProject.id,
				//inverseAttributId,
			})

			// ************** Project's Attributes **************
			const attProjectId = await this.attributsService.create({
				entite: entiteProject,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attProjectCreatedBy = await this.attributsService.create({
				entite: entiteProject,
				name: "createdBy",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteUser.id,
				inverseAttributId: attrUserProjects.id,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attrProjectEntites = await this.attributsService.create({
				entite: entiteProject,
				name: "entites",
				tipe: "OneToMany",
				position: 1,
				targetEntiteId: entiteEntite.id,
				//inverseAttributId: attrUserProjects.id,
			})

			attrUserProjects.inverseAttributId = attProjectCreatedBy.id
			await this.attributsService.save(attrUserProjects)

			// ************** Entite's Attributes **************
			const attEntiteId = await this.attributsService.create({
				entite: entiteEntite,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrEntiteProject = await this.attributsService.create({
				entite: entiteEntite,
				name: "project",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteProject.id,
				inverseAttributId: attrProjectEntites.id,
			})

			attrProjectEntites.inverseAttributId = attrEntiteProject.id
			await this.attributsService.save(attrProjectEntites)

			await this.attributsService.create({
				entite: entiteEntite,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteEntite,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "isFeminin",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			const attrEntiteAttributes = await this.attributsService.create({
				entite: entiteEntite,
				name: "attributs",
				tipe: "OneToMany",
				position: 1,
				targetEntiteId: entiteAttribut.id,
				//inverseAttributId,
			})

			// ************** Attribut's Attributes **************

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrAttributEntite = await this.attributsService.create({
				entite: entiteAttribut,
				name: "entite",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteEntite.id,
				inverseAttributId: attrEntiteAttributes.id,
			})

			attrEntiteAttributes.inverseAttributId = attrAttributEntite.id
			await this.attributsService.save(attrEntiteAttributes)

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "tipe",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "longueur",
				tipe: "Int",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "description",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "position",
				tipe: "Int",
				position: 1,
				isNullable: true,
				isUnique: false,
			})

			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isWip",
				tipe: "Boolean",
				position: 1,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isFeminin",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isNullable",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "isUnique",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "targetEntiteId",
				tipe: "number",
				position: 1,
				isNullable: true,
				isUnique: false,
				//targetEntiteId:,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "inverseAttributId",
				tipe: "number",
				position: 1,
				isNullable: true,
				isUnique: false,
				//targetEntiteId:,
				//inverseAttributId,
			})
			await this.attributsService.create({
				entite: entiteAttribut,
				name: "defaut",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
				isWip: true,
			})

			// ************** Xxxxxxxxxxxxxxx's Attributes **************
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-sl")
	async fixtureProjetSL(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/ad - For user:", user.username)

		try {
			// ************** PROJECT **************
			const projectSl = await this.projectsService.create({
				name: "SL",
				description: null,
				infos: null,
				isWip: true,
				createdBy: user,
			})

			// ************** ENTITES **************

			const entiteUser = await this.entitesService.create({
				project: projectSl,
				name: "User",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 0,
				umlPosY: 0,
			})

			const entiteListeUser = await this.entitesService.create({
				project: projectSl,
				name: "ListeUser",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 500,
				umlPosY: 0,
			})

			const entiteListe = await this.entitesService.create({
				project: projectSl,
				name: "Liste",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 1000,
				umlPosY: 0,
			})

			const entiteArticle = await this.entitesService.create({
				project: projectSl,
				name: "Article",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 400,
				umlPosY: 300,
			})

			const entiteRecipe = await this.entitesService.create({
				project: projectSl,
				name: "Recipe",
				description: null,
				infos: null,
				isWip: false,
				umlPosX: 1000,
				umlPosY: 300,
			})

			// ************** User's Attributes **************
			const attUserId = await this.attributsService.create({
				entite: entiteUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "email",
				tipe: "string",
				position: 2,
				isNullable: false,
				isUnique: true,
			})
			const attUserName = await this.attributsService.create({
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
			await this.attributsService.create({
				entite: entiteUser,
				name: "password",
				tipe: "string",
				position: 4,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "accessToken",
				tipe: "string",
				position: 5,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "emailValidationToken",
				tipe: "string",
				position: 6,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetToken",
				tipe: "string",
				position: 7,
				isNullable: true,
				isUnique: true,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "passwordResetAt",
				tipe: "DateTime",
				position: 8,
				isNullable: true,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 9,
				isNullable: false,
				isUnique: false,
			})

			const attrUserListeUsers = await this.attributsService.create({
				entite: entiteUser,
				name: "listeUsers",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteListeUser.id,
				//inverseAttributId,
			})

			// ************** Liste's Attributes **************
			const attListeId = await this.attributsService.create({
				entite: entiteListe,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteListe,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrListeListeUsers = await this.attributsService.create({
				entite: entiteListe,
				name: "listeUsers",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteListeUser.id,
				//inverseAttributId,
			})

			const attrListeArticles = await this.attributsService.create({
				entite: entiteListe,
				name: "articles",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteArticle.id,
				//inverseAttributId: attrArticleListe.id,
			})

			const attrListeRecipes = await this.attributsService.create({
				entite: entiteListe,
				name: "recipes",
				tipe: "OneToMany",
				position: 10,
				targetEntiteId: entiteRecipe.id,
				//inverseAttributId: attrRecipeListe.id,
			})

			// ************** ListeUser's Attributes **************

			await this.attributsService.create({
				entite: entiteListeUser,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			const attrListeUserListe = await this.attributsService.create({
				entite: entiteListeUser,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrUserListeUsers.id,
			})
			const attrListeUserUser = await this.attributsService.create({
				entite: entiteListeUser,
				name: "user",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteUser.id,
				inverseAttributId: attrListeListeUsers.id,
			})

			attrUserListeUsers.inverseAttributId = attrListeUserListe.id
			attrListeListeUsers.inverseAttributId = attrListeUserUser.id
			await this.attributsService.save(attrUserListeUsers)
			await this.attributsService.save(attrListeListeUsers)

			await this.attributsService.create({
				entite: entiteListeUser,
				name: "isOwner",
				tipe: "Boolean",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			// ************** Article's Attributes **************
			const attArticleId = await this.attributsService.create({
				entite: entiteArticle,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteArticle,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrArticleListe = await this.attributsService.create({
				entite: entiteArticle,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrListeArticles.id,
			})

			attrListeArticles.inverseAttributId = attrArticleListe.id
			await this.attributsService.save(attrListeArticles)

			// ************** Recipe's Attributes **************

			const attRecipeId = await this.attributsService.create({
				entite: entiteRecipe,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
				isPrimaryKey: true,
			})
			await this.attributsService.create({
				entite: entiteRecipe,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrRecipeListe = await this.attributsService.create({
				entite: entiteRecipe,
				name: "liste",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteListe.id,
				inverseAttributId: attrListeRecipes.id,
			})

			attrListeRecipes.inverseAttributId = attrRecipeListe.id
			await this.attributsService.save(attrListeRecipes)

			// ************** Xxxxxxxxxxxxxxx's Attributes **************
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}
}
