/* eslint-disable @typescript-eslint/no-unused-vars */

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	Param,
} from "@nestjs/common"
import { AttributsService } from "./attributs.service"
import { EntitesService } from "../entites/entites.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Response, Request } from "express"
import { Headers, Query, Redirect } from "@nestjs/common"
import fetch from "node-fetch"

import { UploadedFile, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// TODO: ne pas envoyer "password" dans les réponses

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

@Controller("attributs")
export class AttributsController {
	constructor(
		private readonly attributsService: AttributsService,
		private readonly entitesService: EntitesService
	) {}

	/*
	 *
	 * La methode qui permet de trouver un user à partir du Bearer token dans les headers
	 * // TODO : A mettre ailleurs pour l'utiliser partout
	 *
	 */
	/*
	private async getUserFromHeaders(headers: any): Promise<any | null> {
		const [type, jwtToken] = headers.authorization?.split(" ") ?? []
		if (type !== "Bearer") return null
		const user = await this.usersService.findOne({
			where: { jwt: jwtToken },
		})
		return user
	}
	*/

	@Get("/my")
	async myAttributs(@Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		//const attributs = await this.attributsService.findAll() // ! by user id

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
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

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

			//return { entite: entite }
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
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const project = await this.projectsService.findOne({where: { id: params.id },})

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

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}

	@Get("/:id")
	async attributShow(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const attribut = await this.attributsService.findOne({where: { id: params.id },})

		const attribut = await this.attributsService.findOneById(params.id)

		return {
			attribut: attribut,
		}

		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
