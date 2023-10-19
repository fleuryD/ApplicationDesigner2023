// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	Request,
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
import { UsersService } from "../users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { Response } from "express"
import fetch from "node-fetch"
import { FileInterceptor } from "@nestjs/platform-express"
import { AuthGuard } from "@nestjs/passport"
import { LocalAuthGuard } from "./local-auth.guard"
import { AuthService } from "./auth.service"
import { Logger } from "@nestjs/common"
import { Public } from "./jwt-auth.guard"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("auth")
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
		private authService: AuthService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

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

	/*
	 *	REGISTER
	 *
	 *	1) check UNIQUE : username, email
	 *	2) check VALIDE : username, email, password // TODO
	 *	3) create user (avec token_email)
	 *	4) send email with token_email // TODO
	 *	5) return success
	 *
	 */

	@Public()
	@Post("register")
	async register(
		@Body("username") username: string,
		@Body("email") email: string,
		@Body("password") password: string
	) {
		if (!username || !email || !password) {
			throw new BadRequestException("missing fields")
		}
		/*
		let existingUser = await getUserByUsername(username)
		if (existingUser.user)
			return res.json({ error: "USERNAME_ALREADY_EXISTS" })
		existingUser = await getUserByEmail(email)
		if (existingUser.user)
			return res.json({ error: "EMAIL_ALREADY_EXISTS" })
		*/

		const hashedPassword = await bcrypt.hash(password, 12)

		try {
			const user = await this.usersService.create({
				username: username.toLowerCase(),
				email: email.toLowerCase(),
				password: hashedPassword,
			})

			delete user.password
			return user
		} catch (e) {
			throw new BadRequestException("email already exists")
		}
	}

	/*
	 *	LOGIN
	 *
	 *
	 */
	@Public()
	@Post("login")
	async login(
		@Body("emailOrUsername") emailOrUsername: string,
		@Body("password") password: string
	) {
		if (!emailOrUsername || !password) {
			Logger.log("⛔ login: throw : MISSING_FIELDS")
			throw new BadRequestException("MISSING_FIELDS")
		}
		let user = await this.usersService.findOneByEmailOrUsername(emailOrUsername)
		if (!user) {
			Logger.log("⛔ login: throw : INVALID_CREDENTIALS")
			throw new BadRequestException("iINVALID_CREDENTIALS")
		}
		if (!(await bcrypt.compare(password, user.password))) {
			Logger.log("⛔ login: throw : INVALID_CREDENTIALS")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}

		if (user.jwt) {
			Logger.log(`🟢 login: "${user.username}"`)
			return {
				message: "success",
				user: user,
			}
		} else {
			const jwt = await this.authService.getAccessToken(user)
			user = await this.usersService.setJwt(user, jwt)
			Logger.log(`🟢 login: "${user.username}" (with new token)`)
			return {
				message: "success",
				user: user,
			}
		}
	}

	/*
	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("jwt")

		return {
			message: "success",
		}
	}
	*/
}
