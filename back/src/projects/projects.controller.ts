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
import { ProjectsService } from "./projects.service"
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

@Controller("projects")
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

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
		const user = await this.userService.findOne({
			where: { jwt: jwtToken },
		})
		return user
	}
	*/

	@Get("/my")
	async myProjects(@Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		//const projects = await this.projectsService.findAll() // ! by user id

		const projects = await this.projectsService.findAll() // TODO : by connectedUser id

		return {
			projects: projects,
		}
	}

	@Post("/new")
	async newProject(
		@Headers() headers,
		@Body("name") name: string,
		@Body("description") description: string,
		@Body("infos") infos: string,
		@Body("isWip") isWip: boolean
	) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		try {
			const project = await this.projectsService.create({
				name,
				description,
				infos,
				isWip,
			})

			return { project: project }
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
	}

	@Get("/:id")
	async projectShow(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		// const project = await this.projectsService.findOne({where: { id: params.id },})

		const project = await this.projectsService.findOne({
			where: { id: params.id },
		})

		return {
			project: project,
		}
		/*
		const project = {
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
			project: project,
		}
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
