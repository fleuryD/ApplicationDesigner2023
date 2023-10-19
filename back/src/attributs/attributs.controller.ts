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
import { AttributsService } from "./attributs.service"
import { EntitesService } from "../entites/entites.service"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("attributs")
export class AttributsController {
	constructor(
		private readonly attributsService: AttributsService,
		private readonly entitesService: EntitesService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	@Get("/my")
	async myAttributs(@Headers() headers) {
		const attributs = await this.attributsService.findAll() // TODO : by connectedUser id
		return {
			attributs: attributs,
		}
	}
	@Post("/new/entite/:id")
	async newEntite(
		@Param() params,
		@Headers() headers,
		@Body("name") name: string,
		@Body("tipe") tipe: string,
		@Body("longueur") longueur: number,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("position") position: number,
		@Body("isWip") isWip: boolean,
		@Body("isFeminin") isFeminin: string,
		@Body("isNullable") isNullable: string,
		@Body("isUnique") isUnique: string,
		@Body("targetEntiteId") targetEntiteId: number,
		@Body("inverseAttributId") inverseAttributId: number
	) {
		const entite = await this.entitesService.findOneById(params.id)
		try {
			const attribut = await this.attributsService.create({
				entite,
				name,
				tipe,
				longueur,
				description,
				infos,
				position,
				isWip,
				isFeminin,
				isNullable,
				isUnique,
				targetEntiteId,
				inverseAttributId,
			})
			return { attribut: attribut }
		} catch (e) {
			throw new BadRequestException("aosdjfla jdsfajlsdjf;alksjkjtjjtjt")
		}
	}

	@Post("/:id/edit")
	async attributEdit(
		@Body("name") name: string,
		@Body("tipe") tipe: string,
		@Body("longueur") longueur: number,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("position") position: number,
		@Body("isWip") isWip: boolean,
		@Body("isFeminin") isFeminin: boolean,
		@Body("isNullable") isNullable: boolean,
		@Body("isUnique") isUnique: boolean,
		@Body("targetEntiteId") targetEntiteId: number,
		@Body("inverseAttributId") inverseAttributId: number,
		@Param() params,
		@Headers() headers
	) {
		let attribut = await this.attributsService.findOneById(params.id)

		attribut.name = name
		attribut.tipe = tipe
		attribut.longueur = longueur
		attribut.description = description
		attribut.infos = infos
		attribut.position = position
		attribut.isWip = isWip
		attribut.isFeminin = isFeminin
		attribut.isNullable = isNullable
		attribut.isUnique = isUnique
		attribut.targetEntiteId = targetEntiteId
		attribut.inverseAttributId = inverseAttributId

		attribut = await this.attributsService.save(attribut)

		return {
			attribut: attribut,
		}
	}

	@Delete("/:id/delete")
	async projectDelete(@Param() params, @Headers() headers) {
		let attribut = await this.attributsService.findOneById(params.id)
		await this.attributsService.remove(attribut.id)

		return {
			success: 1,
		}
	}

	@Get("/:id")
	async attributShow(@Param() params, @Headers() headers) {
		const attribut = await this.attributsService.findOneById(params.id)

		return {
			attribut: attribut,
		}
	}
}
