// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Project } from "./project.entity"
import { Entite } from "../entites/entite.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private projectsRepository: Repository<Project>
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async create(project: any): Promise<Project> {
		return this.projectsRepository.save(project) // ????????? await
	}

	findAll(): Promise<Project[]> {
		return this.projectsRepository.find()
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
				* /
				//.leftJoinAndSelect("project.entites", "project")
				//.leftJoinAndSelect("project.targetEntite", "entite")
				//.leftJoinAndSelect("entite.attributes", "attribute")
				//.leftJoinAndSelect("attribute.targetEntite", "entite")
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

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
}
