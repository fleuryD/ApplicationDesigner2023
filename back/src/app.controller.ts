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
import { User } from "./users"
import { fixtureProjetTranscendance } from "./fixtures/fixture.projet.42transcendance"
import { fixtureProjetYZ } from "./fixtures/fixture.projet.yz"
import { fixtureProjetAD } from "./fixtures/fixture.projet.ad"
import { fixtureProjetSL } from "./fixtures/fixture.projet.sl"
import { fixtureEntiteUser } from "./fixtures/fixture.entite.user"

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
	async routehome() {
		return "Hello"
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Get("/fixtures/project-transcendance")
	async routeFixtureProjetTranscendance(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		try {
			fixtureProjetTranscendance(
				user,
				this.projectsService,
				this.entitesService,
				this.attributsService
			)
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-yz")
	async routefixtureProjetYz(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)

		try {
			fixtureProjetYZ(
				user,
				this.projectsService,
				this.entitesService,
				this.attributsService
			)
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-ad")
	async routefixtureProjetApplicationDesigner(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)

		try {
			fixtureProjetAD(
				user,
				this.projectsService,
				this.entitesService,
				this.attributsService
			)
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project-sl")
	async routefixtureProjetSL(@UserFromToken() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		try {
			fixtureProjetSL(
				user,
				this.projectsService,
				this.entitesService,
				this.attributsService
			)
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/project/:id/entite-user")
	async routefixtureEntiteUser(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)

		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})

		const project = await this.projectsService.findOneById(params.id)

		try {
			fixtureEntiteUser(user, project, this.entitesService, this.attributsService)
			return { success: 1 }
		} catch (e) {
			throw new BadRequestException("errrrrrrrrrrrrror")
		}
	}

	@Get("/fixtures/entite/:id/attribut-id")
	async routefixtureAttributId(@UserFromToken() userFromToken, @Param() params) {
		const user = await this.usersService.findOneById(userFromToken.id)
		//this.appService.fixtureTest(user)
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

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
}
