/* eslint-disable @typescript-eslint/no-unused-vars */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Delete,
	Req,
	Res,
	UnauthorizedException,
	Param,
	UseGuards,
	Headers,
	Query,
	Redirect,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common"
import { UsersService } from "./users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Response, Request } from "express"
import fetch from "node-fetch"
import { FileInterceptor } from "@nestjs/platform-express"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// TODO: ne pas envoyer "password" dans les réponses

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService
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

	@Get("/")
	async users(@Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//	if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		const users = await this.usersService.findAll()

		return {
			users: users,
		}
	}

	@Get("/:id")
	async userShow(@Param() params, @Headers() headers) {
		//const connectedUser = await this.getUserFromHeaders(headers)
		//if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		const user = await this.usersService.findOneById(params.id)

		const { password, ...result } = user

		return {
			user: user,
		}
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
}
