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
} from "@nestjs/common"
import { EntitesService } from "./entites.service"
import { ProjectsService } from "../projects/projects.service"

import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Response, Request } from "express"
import { Headers, Query, Redirect } from "@nestjs/common"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// TODO: ne pas envoyer "password" dans les réponses

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

@Controller("entites")
export class EntitesController {
	constructor(
		private readonly entitesService: EntitesService,
		private readonly projectsService: ProjectsService
	) {}

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
		const user = await this.userService.findOne({
			where: { jwt: jwtToken },
		})
		return user
	}
	*/

	@Get("/my")
	async myEntites(@Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		//const entites = await this.entitesService.findAll() // ! by user id

		const entites = await this.entitesService.findAll() // TODO : by connectedUser id

		return {
			entites: entites,
		}
	}

	@Post("/new/project/:id")
	async newEntite(
		@Param() params,
		@Headers() headers,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		const project = await this.projectsService.findOneById(params.id)

		try {
			const entite = await this.entitesService.create({
				project,
				name,
				description,
				infos,
				isWip,
			})

			return { entite: entite }
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
	}

	@Post("/:id/edit")
	async entiteEdit(
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

		let entite = await this.entitesService.findOneById(params.id)

		entite.name = name
		entite.description = description
		entite.infos = infos
		entite.isWip = isWip

		entite = await this.entitesService.save(entite)

		return {
			entite: entite,
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

		let entite = await this.entitesService.findOneById(params.id)
		await this.entitesService.remove(entite.id)

		return {
			success: 1,
		}

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}

	@Get("/:id")
	async entiteShow(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const entite = await this.entitesService.findOne({where: { id: params.id },})

		const entite = await this.entitesService.findOneById(params.id)

		return {
			entite: entite,
		}
		return {
			entite: entite,
		}
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
