// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { BadRequestException, Controller, Get, Request, UseGuards } from "@nestjs/common"
import { AppService } from "./app.service"
import { ProjectsService } from "./projects/projects.service"
import { EntitesService } from "./entites/entites.service"
import { AttributsService } from "./attributs/attributs.service"
import { LocalAuthGuard } from "./auth/local-auth.guard"
import { Public } from "./auth/jwt-auth.guard"
import { Logger } from "@nestjs/common"
import { User } from "./auth/user.decorator"
import { UsersService } from "./users/users.service"

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

	@UseGuards(LocalAuthGuard)
	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@UseGuards(LocalAuthGuard)
	@Get("/test")
	async tessssst(@Request() req) {
		return req.user
	}

	@Get("/fixtures/project-ad")
	async fixtureProjetAD(@User() userFromToken) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }
		Logger.log("🟠 /fixtures/projet/ad - For userFromToken:", userFromToken)
		const user = await this.usersService.findOneById(userFromToken.id)
		Logger.log("🟠 /fixtures/projet/ad - For user:", user)

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
				name: "jwt",
				tipe: "string",
				position: 1,
				isNullable: true,
				isUnique: true,
			})

			await this.attributsService.create({
				entite: entiteUser,
				name: "createdAt",
				tipe: "DateTime",
				position: 1,
				isNullable: false,
				isUnique: false,
			})

			const attrUserProjects = await this.attributsService.create({
				entite: entiteUser,
				name: "projects",
				tipe: "OneToMany",
				position: 1,
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
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "name",
				tipe: "string",
				position: 1,
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
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
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteProject,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: false,
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
				targetEntiteId: entiteProject.id,
				//inverseAttributId,
			})

			// ************** Entite's Attributes **************
			const attEntiteId = await this.attributsService.create({
				entite: entiteEntite,
				name: "id",
				tipe: "Int",
				position: 1,
				isNullable: false,
				isUnique: true,
			})
			const attrEntiteProject = await this.attributsService.create({
				entite: entiteEntite,
				name: "project",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteProject.id,
				inverseAttributId: attrProjectEntites.id,
			})

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
				isNullable: false,
				isUnique: false,
			})
			await this.attributsService.create({
				entite: entiteEntite,
				name: "infos",
				tipe: "string",
				position: 1,
				isNullable: false,
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
			})
			const attrAttributEntite = await this.attributsService.create({
				entite: entiteAttribut,
				name: "entite",
				tipe: "ManyToOne",
				position: 1,
				targetEntiteId: entiteEntite.id,
				inverseAttributId: attrEntiteAttributes.id,
			})

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
				isNullable: false,
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
				isNullable: false,
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
}
