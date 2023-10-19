/* eslint-disable @typescript-eslint/no-unused-vars */

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Req,
	Res,
	UnauthorizedException,
	Param,
	UseGuards,
	Headers,
	Query,
	Redirect,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Response, Request } from "express"
import fetch from "node-fetch"
import { FileInterceptor } from "@nestjs/platform-express"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// TODO: ne pas envoyer "password" dans les réponses

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

@Controller("projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	/*
	 *
	 * La methode qui permet de trouver un user à partir du Bearer token dans les headers
	 * // TODO : A mettre ailleurs pour l'utiliser partout
	 *
	 */
	/*
	private async getUserFromHeaders(headers: any): Promise<any | null> {
		const [type, jwtToken] = headers.authorization?.split(" ") ?? []
		if (type !== "Bearer") return null
		const user = await this.usersService.findOne({
			where: { jwt: jwtToken },
		})
		return user
	}
	*/

	@Get("/my")
	async myProjects(@Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		//const projects = await this.projectsService.findAll() // ! by user id

		const projects = await this.projectsService.findAll() // TODO : by connectedUser id

		return {
			projects: projects,
		}
	}

	@Post("/new")
	async newProject(
		@Headers() headers,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		try {
			const project = await this.projectsService.create({
				name,
				description,
				infos,
				isWip,
			})

			return { project: project }
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
	}

	@Post("/:id/edit")
	async projectEdit(
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean,
		@Param() params,
		@Headers() headers
	) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const project = await this.projectsService.findOne({where: { id: params.id },})

		let project = await this.projectsService.findOneById(params.id)

		project.name = name
		project.description = description
		project.infos = infos
		project.isWip = isWip

		project = await this.projectsService.save(project)

		return {
			project: project,
		}

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}

	@Delete("/:id/delete")
	async projectDelete(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const project = await this.projectsService.findOne({where: { id: params.id },})

		let project = await this.projectsService.findOneById(params.id)
		await this.projectsService.remove(project.id)

		return {
			success: 1,
		}

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}

	@Get("/:id")
	async projectShow(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const project = await this.projectsService.findOne({where: { id: params.id },})

		const project = await this.projectsService.findOneById(params.id)
		// TODO VERIF DROIT

		return {
			project: project,
		}

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
