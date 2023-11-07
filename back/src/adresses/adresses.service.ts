// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable, ForbiddenException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Logger } from "@nestjs/common"
import { Adresse } from "./adresse.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class AdressesService {
	constructor(
		@InjectRepository(Adresse)
		private adressesRepository: Repository<Adresse>
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async create(adresse: any): Promise<Adresse> {
		return this.adressesRepository.save(adresse)
	}

	findAll(): Promise<Adresse[]> {
		return this.adressesRepository.find()
	}

	async findOne(condition: any): Promise<Adresse> {
		return this.adressesRepository.findOne(condition)
	}

	async findOneById(id: number): Promise<Adresse | null> {
		return this.adressesRepository.findOneBy({ id })
	}

	async remove(id: number): Promise<void> {
		await this.adressesRepository.delete(id)
	}

	async save(adresse: Adresse): Promise<Adresse> {
		Logger.log("save: ", adresse.name)
		return await this.adressesRepository.save(adresse)
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
}
