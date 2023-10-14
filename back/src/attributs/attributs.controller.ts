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
	constructor(private readonly attributsService: AttributsService) {}

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

	@Post("/new")
	async newAttribut(
		@Headers() headers,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		try {
			const attribut = await this.attributsService.create({
				name,
				description,
				infos,
				isWip,
			})

			return { attribut: attribut }
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
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
		/*
		const attribut = {
			id: params.id,
			name: "Trsdtl fixture",
			description: "description fixture 1",
			infos: "infos fixture 1",
			createdAt: "2021-01-01",
			isWip: false,
			entites: [
				{
					id: 1,
					name: "User",
					attributs: [
						{
							id: 1,
							name: "username",
							tipe: "string",
							longueur: 128,
							isNullable: false,
							isUnique: true,
						},
						{
							id: 2,
							name: "email",
							tipe: "string",
							isNullable: false,
							isUnique: true,
						},
					],
				},
				{
					id: 2,
					name: "Channel",
					attributs: [
						{
							id: 10,
							name: "name",
							tipe: "string",
							isNullable: false,
							isUnique: true,
						},
						{
							id: 11,
							name: "private",
							tipe: "boolean",
							isNullable: false,
							isUnique: false,
						},
						{
							id: 12,
							name: "password",
							tipe: "string",
							isNullable: true,
							isUnique: false,
						},
					],
				},
				{
					id: 3,
					name: "Message",
					attributs: [
						{
							id: 110,
							name: "content",
							tipe: "string",
							isNullable: false,
							isUnique: false,
						},
						{
							id: 120,
							name: "createdAt",
							tipe: "datetime",
							isNullable: false,
							isUnique: false,
						},
					],
				},
			],
		}
		*/
		return {
			attribut: attribut,
		}
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
