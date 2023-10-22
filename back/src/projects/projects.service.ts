// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm"
import { EntityManager, Repository } from "typeorm"
import { Project } from "./project.entity"
import { Entite } from "../entites/entite.entity"
import { User } from "src/users/user.entity"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private projectsRepository: Repository<Project>,
		@InjectEntityManager()
		private projectManager: EntityManager
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async create(project: any): Promise<Project> {
		return this.projectsRepository.save(project) // ????????? await
	}

	findAll(): Promise<Project[]> {
		return this.projectsRepository.find()
	}

	findAllByCreator(creator: User): Promise<Project[]> {
		return this.projectsRepository.find({
			where: {
				createdBy: creator,
			},
		})
	}

	async findOne(condition: any): Promise<Project> {
		return this.projectsRepository.findOne(condition)
	}

	/*
	async findOne(condition: any): Promise<Project> {
		return (
			this.projectsRepository
				.createQueryBuilder("project")
				.leftJoinAndSelect("project.entites", "project")
				/*
				.leftJoinAndMapMany(
					"project.entites",
					Entite,
					"entite",
					"entite.projectId = project.id"
				)
				.where(condition)
				.getOne()
		)
	}
	*/
	async findOneById(id: number): Promise<Project | null> {
		return this.projectsRepository.findOne({
			where: {
				id: id,
			},
		})
		//return this.projectsRepository.findOneBy({ id })
	}

	async remove(id: number): Promise<void> {
		await this.projectsRepository.delete(id)
	}

	async save(project: Project): Promise<Project> {
		return await this.projectsRepository.save(project)
	}

	/*
	async update(id: number) {
		return await this.projectsRepository.update(
			{
				id,
			},
			{
				name: data.name,
				summary: data.summary,
				authorIntro: data.authorIntro,
				price: data.price,
				completionAt: data.completionAt,
				isAllDone: data.isAllDone,
				isAgree: data.isAgree,
			}
		)
	}
	*/

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async ensureAuthorizedAccessProject({
		userId,
		projectId,
	}: {
		userId: number
		projectId: number
	}) {
		const project = await this.projectsRepository
			.createQueryBuilder("project")
			.where("project.id= :projectId", { projectId: projectId })
			.leftJoinAndSelect("project.createdBy", "user")
			.getOne()

		if (project?.createdBy?.id === userId) {
			Logger.log(
				`✅ ensureAuthorizedAccessProject :: user #${userId} can access project: ${project.name}`
			)
			return
		}
		Logger.log(
			`⛔ ensureAuthorizedAccessProject :: user #${userId} can't access project #${projectId}`
		)
		throw new UnauthorizedException("UNAUTHORIZED_ACCESS_TO_PROJECT")
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
}
