/* eslint-disable @typescript-eslint/no-unused-vars */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	InternalServerErrorException,
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Param,
} from "@nestjs/common"
import { EntitesService } from "./entites.service"
import { ProjectsService } from "../projects/projects.service"
import { UserFromToken } from "src/auth/user-from-token.decorator"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("entites")
export class EntitesController {
	constructor(
		private readonly entitesService: EntitesService,
		private readonly projectsService: ProjectsService
	) {}

	/*
	 * *************************************************************************
	 *
	 * 	SET ENTITE'S POSITION IN THE UML
	 *
	 */
	@Post("/set-uml-position/:id")
	async setEntiteUmlPosition(
		@Param() params,
		@Body("posX") posX: number,
		@Body("posY") posY: number,
		@UserFromToken() userFromToken
	) {
		await this.entitesService.ensureAuthorizedAccessEntite({
			userId: userFromToken.id,
			entiteId: params.id,
		})
		let entite = await this.entitesService.findOneById(params.id)

		try {
			Logger.log(`set-uml-position ; ${entite.name} ;  ${posX}  ${posY} `)
			entite = await this.entitesService.setUmlPosition(entite, posX, posY)
			return { entite: entite }
		} catch (e) {
			throw new InternalServerErrorException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	ADD ENTITE TO PROJECT TARGETED BY :id
	 *
	 */
	@Post("/new/project/:id")
	async newEntite(
		@Param() params,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean,
		@UserFromToken() userFromToken
	) {
		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})
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
			throw new InternalServerErrorException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	EDIT ENTITE TARGETED BY :id
	 *
	 */
	@Post("/:id/edit")
	async entiteEdit(
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean,
		@Param() params,
		@UserFromToken() userFromToken
	) {
		await this.entitesService.ensureAuthorizedAccessEntite({
			userId: userFromToken.id,
			entiteId: params.id,
		})
		let entite = await this.entitesService.findOneById(params.id)
		entite.name = name
		entite.description = description
		entite.infos = infos
		entite.isWip = isWip

		entite = await this.entitesService.save(entite)

		return {
			entite: entite,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	DELETE ENTITE TARGETED BY :id
	 *
	 */
	@Delete("/:id/delete")
	async projectDelete(@Param() params, @UserFromToken() userFromToken) {
		await this.entitesService.ensureAuthorizedAccessEntite({
			userId: userFromToken.id,
			entiteId: params.id,
		})
		let entite = await this.entitesService.findOneById(params.id)
		await this.entitesService.remove(entite.id)

		return {
			success: 1,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	GET ENTITE TARGETED BY :id
	 *
	 */
	/*
	@Get("/:id")
	async entiteShow(@Param() params,
		@UserFromToken() userFromToken
	) {
		await this.entitesService.ensureAuthorizedAccessEntite({
			userId: userFromToken.id,
			entiteId: params.id,
		})
		const entite = await this.entitesService.findOneById(params.id)

		return {
			entite: entite,
		}
	}
	*/
}
