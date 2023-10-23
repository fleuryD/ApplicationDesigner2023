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
import { UsersService } from "src/users/users.service"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("projects")
export class ProjectsController {
	constructor(
		private readonly projectsService: ProjectsService,
		private readonly usersService: UsersService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	/*
	 * get all projects of the user
	 *
	 */
	@Get("/my")
	async myProjects(@User() userFromToken) {
		const user = await this.usersService.findOneById(userFromToken.id)
		const projects = user.projects
		return {
			projects: projects,
		}
	}

	@Post("/new")
	async newProject(
		@User() userFromToken,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
		const user = await this.usersService.findOneById(userFromToken.id)
		try {
			const project = await this.projectsService.create({
				name,
				description,
				infos,
				isWip,
				createdBy: user,
			})

			return { project: project }
		} catch (e) {
			throw new BadRequestException("INTERNAL_ERROR")
		}
	}

	@Post("/:id/edit")
	async projectEdit(
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean,
		@Param() params,
		@User() userFromToken
	) {
		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})

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
	async projectDelete(@Param() params, @User() userFromToken) {
		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})

		let project = await this.projectsService.findOneById(params.id)
		await this.projectsService.remove(project.id)

		return {
			success: 1,
		}
	}

	@Get("/:id")
	async projectShow(@Param() params, @User() userFromToken) {
		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})

		const project = await this.projectsService.findOneById(params.id)
		return {
			project: project,
		}
	}
}
