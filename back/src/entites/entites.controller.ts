/* eslint-disable @typescript-eslint/no-unused-vars */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Headers,
} from "@nestjs/common"
import { EntitesService } from "./entites.service"
import { ProjectsService } from "../projects/projects.service"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("entites")
export class EntitesController {
	constructor(
		private readonly entitesService: EntitesService,
		private readonly projectsService: ProjectsService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Post("/new/project/:id")
	async newEntite(
		@Param() params,
		@Headers() headers,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
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

	@Delete("/:id/delete")
	async projectDelete(@Param() params, @Headers() headers) {
		let entite = await this.entitesService.findOneById(params.id)
		await this.entitesService.remove(entite.id)

		return {
			success: 1,
		}
	}

	@Get("/:id")
	async entiteShow(@Param() params, @Headers() headers) {
		const entite = await this.entitesService.findOneById(params.id)

		return {
			entite: entite,
		}
		return {
			entite: entite,
		}
	}
}
