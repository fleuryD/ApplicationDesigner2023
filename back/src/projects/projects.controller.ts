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
import { ProjectsService } from "./projects.service"

import { User } from "../auth/user.decorator"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Get("/my")
	async myProjects(@Headers() headers, @User() userFromToken) {
		console.log("userFromToken", userFromToken)
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
		let project = await this.projectsService.findOneById(params.id)

		project.name = name
		project.description = description
		project.infos = infos
		project.isWip = isWip

		project = await this.projectsService.save(project)

		return {
			project: project,
		}
	}

	@Delete("/:id/delete")
	async projectDelete(@Param() params, @Headers() headers) {
		let project = await this.projectsService.findOneById(params.id)
		await this.projectsService.remove(project.id)

		return {
			success: 1,
		}
	}

	@Get("/:id")
	async projectShow(@Param() params, @Headers() headers) {
		const project = await this.projectsService.findOneById(params.id)
		// TODO VERIF DROIT

		return {
			project: project,
		}
	}
}
