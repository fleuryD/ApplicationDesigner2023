// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// TODO: ne pas envoyer "password" dans les réponses

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

@Controller("auth")
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
		private authService: AuthService
	) {}

	@UseGuards(LocalAuthGuard)
	@Get("/test")
	async test(@Request() req) {
		return req.user
	}

	@Get("/test1")
	test1() {
		return "test1"
	}

	@Get("/test2")
	@UseGuards(LocalAuthGuard)
	test2() {
		return "test2"
	}

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
	 *	1) check UNIQUE : username, email
	 *	2) check VALIDE : username, email, password // TODO
	 *	3) create user (avec token_email)
	 *	4) send email with token_email // TODO
	 *	5) return success
	 *
	 */
	@Post("login____back")
	//@UseGuards(LocalAuthGuard)
	async login____back(
		@Body("emailOrUsername") emailOrUsername: string,
		@Body("password") password: string,
		@Body("code") code: string,
		@Res({ passthrough: true }) response: Response
	) {
		if (!emailOrUsername || !password) {
			throw new BadRequestException("missing fields")
		}
		const user = await this.usersService.findOneByEmailOrUsername(emailOrUsername)
		if (!user) {
			throw new BadRequestException("invalid credentials")
		}
		if (!(await bcrypt.compare(password, user.password))) {
			throw new BadRequestException("invalid credentials")
		}
		const jwt = await this.jwtService.signAsync({ id: user.id })
		await this.usersService.setJwt(user, jwt)
		return {
			message: "success",
			user: { jwt, ...user },
		}
	}

	@Post("login")
	//@UseGuards(LocalAuthGuard)
	async login(
		@Body("emailOrUsername") emailOrUsername: string,
		@Body("password") password: string
	) {
		Logger.log("🔵 emailOrUsername", emailOrUsername)
		Logger.log("🔵 password", password)
		//Logger.warn("warning")
		//Logger.error("something went wrong! ", "error")

		const user = { username: emailOrUsername, password: password }

		Logger.log("🔵 user", user)

		return this.authService.login(user)
	}

	/*
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

		const user = await this.usersService.findOne({
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

		const users = await this.usersService.findAll()
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

		const user = await this.usersService.findOne({
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
