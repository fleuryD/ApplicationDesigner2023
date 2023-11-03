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
	Logger,
} from "@nestjs/common"
import { AttributsService } from "./attributs.service"
import { EntitesService } from "../entites/entites.service"
import { UserFromToken } from "src/auth/user-from-token.decorator"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("attributs")
export class AttributsController {
	constructor(
		private readonly attributsService: AttributsService,
		private readonly entitesService: EntitesService
	) {}

	/*
	 * *************************************************************************
	 *
	 * 	ADD ATTRIBUT TO ENTITE TARGETED BY :id
	 *
	 */
	@Post("/new/entite/:id")
	async newEntite(
		@Param() params,
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
		@Body("isPrimaryKey") isPrimaryKey: string,
		@Body("targetEntiteId") targetEntiteId: number,
		@Body("inverseAttributId") inverseAttributId: number,
		@UserFromToken() userFromToken
	) {
		await this.entitesService.ensureAuthorizedAccessEntite({
			userId: userFromToken.id,
			entiteId: params.id,
		})

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
				isPrimaryKey,
				targetEntiteId,
				inverseAttributId,
			})
			return { attribut: attribut }
		} catch (e) {
			throw new BadRequestException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	EDITE ATTRIBUT TARGETED BY :id
	 *
	 */
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
		@Body("isPrimaryKey") isPrimaryKey: boolean,
		@Body("targetEntiteId") targetEntiteId: number,
		@Body("inverseAttributId") inverseAttributId: number,
		@Param() params,
		@UserFromToken() userFromToken
	) {
		await this.attributsService.ensureAuthorizedAccessAttribut({
			userId: userFromToken.id,
			attributId: params.id,
		})
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
		attribut.isPrimaryKey = isPrimaryKey
		attribut.targetEntiteId = targetEntiteId
		attribut.inverseAttributId = inverseAttributId

		attribut = await this.attributsService.save(attribut)

		return {
			attribut: attribut,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	DELETE ATTRIBUT TARGETED BY :id
	 *
	 */
	@Delete("/:id/delete")
	async projectDelete(@Param() params, @UserFromToken() userFromToken) {
		await this.attributsService.ensureAuthorizedAccessAttribut({
			userId: userFromToken.id,
			attributId: params.id,
		})
		let attribut = await this.attributsService.findOneById(params.id)
		await this.attributsService.remove(attribut.id)

		return {
			success: 1,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	GET ATTRIBUT TARGETED BY :id
	 *
	 */
	/*
	@Get("/:id")
	async attributShow(@Param() params,
		@UserFromToken() userFromToken
	) {
		await this.attributsService.ensureAuthorizedAccessAttribut({
			userId: userFromToken.id,
			attributId: params.id,
		})
		const attribut = await this.attributsService.findOneById(params.id)

		return {
			attribut: attribut,
		}
	}
	*/
}
