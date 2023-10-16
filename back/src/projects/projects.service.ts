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

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
}

/*



en nestjs j'ai une entite Project qui a un attribut "entites" qui est un tableau d'entites
et une entite Entite qui a un attribut "attributs" qui est un tableau d'attributs
avec le code dsuivant, j'ai une erreur de circular reference


@ManyToOne(() => Entite , {		eager: true,	} *)
public targetEntite: Entite



comment modifier le code suivant pour recuperer les attributs de l'entite cible ?

	async findOne(condition: any): Promise<Project> {
		return this.projectsRepository.findOne(condition)
	}

	*/
