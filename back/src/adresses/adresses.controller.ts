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
import { AdressesService } from "./adresses.service"
import { ProjectsService } from "../projects/projects.service"
import { UserFromToken } from "../auth/user-from-token.decorator"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("adresses")
export class AdressesController {
	constructor(
		private readonly adressesService: AdressesService,
		private readonly projectsService: ProjectsService
	) {}

	/*
	 * *************************************************************************
	 *
	 * 	ADD NEWADRESSE TO PROJECT TARGETED BY :id
	 *
	 */
	@Post("/new/project/:id")
	async newAdresse(
		@Param() params,
		@UserFromToken() userFromToken,
		@Body("url") url: string,
		@Body("name") name: string
	) {
		await this.projectsService.ensureAuthorizedAccessProject({
			userId: userFromToken.id,
			projectId: params.id,
		})
		const projet = await this.projectsService.findOneById(params.id)

		try {
			const adresse = await this.adressesService.create({
				url,
				name,
				projet,
			})

			return { adresse: adresse }
		} catch (e) {
			throw new InternalServerErrorException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	EDIT ADRESSE TARGETED BY :id
	 *
	 */
	@Post("/:id/edit")
	async adresseEdit(
		@Param() params,
		@UserFromToken() userFromToken,
		@Body("id") id: number,
		@Body("url") url: string,
		@Body("name") name: string
		///// @Body("projet") projet: ManyToOne
	) {
		// await this.adressesService.ensureAuthorizedAccessAdresse({userId: userFromToken.id, adresseId: params.id })
		let adresse = await this.adressesService.findOneById(params.id)

		Logger.log(adresse.name)
		adresse.url = url
		adresse.name = name
		//// adresse.projet = projet
		Logger.log(adresse.name)

		adresse = await this.adressesService.save(adresse)

		Logger.log(adresse.name)

		return {
			adresse: adresse,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	DELETE ADRESSE TARGETED BY :id
	 *
	 */
	@Delete("/:id/delete")
	async projectDelete(@Param() params, @UserFromToken() userFromToken) {
		// await this.adressesService.ensureAuthorizedAccessAdresse({userId: userFromToken.id, adresseId: params.id })
		let adresse = await this.adressesService.findOneById(params.id)
		await this.adressesService.remove(adresse.id)

		return {
			success: 1,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	GET ADRESSE TARGETED BY :id
	 *
	 */

	@Get("/:id")
	async adresseShow(@Param() params, @UserFromToken() userFromToken) {
		// await this.adressesService.ensureAuthorizedAccessAdresse({userId: userFromToken.id, adresseId: params.id })
		const adresse = await this.adressesService.findOneById(params.id)

		return {
			adresse: adresse,
		}
	}
}
