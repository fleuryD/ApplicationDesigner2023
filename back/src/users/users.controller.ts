/* eslint-disable prettier/prettier */
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
import { UsersService } from "./users.service"
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

@Controller("api")
export class UsersController {
	constructor(
		private readonly userService: UsersService,
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
		const user = await this.userService.findOne({
			where: { jwt: jwtToken },
		})
		return user
	}


	@Post("register")
	async register(
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string
	) {
		if (!name || !email || !password) {
			throw new BadRequestException("missing fields")
		}
		const hashedPassword = await bcrypt.hash(password, 12)

		try {
			const user = await this.userService.create({
				name: name.toLowerCase(),
				email: email.toLowerCase(),
				doubleAuthActive: false,
				password: hashedPassword,
				status: "OFFLINE",
			})

			delete user.password
			return user
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
	}

	@Post("login")
	async login(
		@Body("email") email: string,
		@Body("password") password: string,
		@Body("code") code: string,
		@Res({ passthrough: true }) response: Response
	) {
		if (!email || !password) {
			throw new BadRequestException("missing fields")
		}

		const user = await this.userService.findOne({ where: { email: email } })

		if (!user) {
			throw new BadRequestException("invalid credentials")
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new BadRequestException("invalid credentials")
		}

		if (user.doubleAuthActive == true) {
			if (!code) {
				return {
					message: "2FA",
					name: user.name,
					email: user.email,
					password: password,
				}
			}

			const isCodeValid =
				this.userService.isTwoFactorAuthenticationCodeValid(code, user)

			if (!isCodeValid) throw new BadRequestException("invalid 2af code")
		}

		const jwt = await this.jwtService.signAsync({ id: user.id })

		response.cookie("jwt", jwt, { httpOnly: true })

		//user.jwt = jwt

		// await this.partieRepository.save(newPartie);

		await this.userService.setJwt(user, jwt)

		return {
			message: "success",
			// jwt: jwt,
			user: { jwt, ...user },
		}
	}

	@Post("profil")
	async profil(@Body("jwt") jwt: string, @Req() request: Request) {
		//try {
		console.log("cookie : " + jwt)

		const data = await this.jwtService.verifyAsync(jwt)

		if (!data) {
			console.log("no data for")
			console.log(jwt)
			//throw new UnauthorizedException();
		}

		const user = await this.userService.findOne({
			where: { id: data["id"] },
		})

		const { password, ...result } = user

		return result
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("jwt")

		return {
			message: "success",
		}
	}


	@Get("users")
	async users(@Headers() headers) {
		const connectedUser = await this.getUserFromHeaders(headers)
		if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		const users = await this.userService.findAll()
		const allRelations =
			await this.userRelationService.getAllUserRelations()

		return {
			users: users,
			relations: connectedUser.userRelations,
			allRelations: allRelations,
		}
	}

	@Get("user/:id")
	async userShow(@Param() params, @Headers() headers) {
		const connectedUser = await this.getUserFromHeaders(headers)
		if (!connectedUser) return { error: "ERROR_JWT_USER_NOT_FOUND" }

		const user = await this.userService.findOne({
			where: { id: params.id },
		})

		const { password, ...result } = user

		return result
		//} catch (e) {
		//    throw new UnauthorizedException();
		//}
	}
	*/
}
