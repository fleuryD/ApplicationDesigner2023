// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { BadRequestException, Body, Controller, Post } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { Logger } from "@nestjs/common"
import { Public } from "./jwt-auth.guard"
import { User } from "src/users/user.entity"
import { MailService } from "src/mail/mail.service"
import { error } from "console"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("auth")
export class AuthController {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
		private authService: AuthService,
		private mailService: MailService
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	/*
	 *	REGISTER
	 *
	 *	1) check VALIDE : username, email, password
	 *	2) check UNIQUE : username, email
	 *	3) hashed password
	 *	3) create user
	 *	3) set emailValidationToken
	 *	4) send email with emailValidationToken
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
			throw new BadRequestException("MISSING_FIELDS")
		}

		// TODO : check VALIDE : username, email, password

		let existingUser = await this.usersService.findOneByUsername(username)
		if (existingUser) throw new BadRequestException("USERNAME_ALREADY_EXISTS")

		existingUser = await this.usersService.findOneByEmail(email)
		if (existingUser) throw new BadRequestException("EMAIL_ALREADY_EXISTS")

		const hashedPassword = await bcrypt.hash(password, 12)

		try {
			let user = await this.usersService.create({
				username: username.toLowerCase(),
				email: email.toLowerCase(),
				password: hashedPassword,
			})

			user = await this.usersService.setNewEmailValidationToken(user)

			console.debug("-------send mail")
			await this.mailService.sendEmailValidation(user)
			console.debug("-------mail sent ")

			delete user.password
			return { success: 1, debugEmailValidationToken: user.emailValidationToken } // !!!  emailValidationToken ::  debug only
		} catch (e) {
			console.debug("-------error", error)
			throw new BadRequestException("INTERNAL_ERROR")
		}
	}

	/*
	 *	LOGIN
	 *
	 * 1) find User by emailOrUsername
	 * 2) if user not found : throw INVALID_CREDENTIALS
	 * 3) if user.emailValidationToken : throw EMAIL_NOT_CONFIRMED
	 * 4) if password invalid : throw INVALID_CREDENTIALS
	 * 5) if user.jwt not set : set jwt
	 * 6) return user (with jwt)
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

		// TODO : check VALIDE : username, email, password

		let user = await this.usersService.findOneByEmailOrUsername(emailOrUsername)
		if (!user) {
			Logger.log("⛔ login: throw : INVALID_CREDENTIALS")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}
		if (user.emailValidationToken) {
			Logger.log("⛔ login: throw : EMAIL_NOT_CONFIRMED")
			throw new BadRequestException("EMAIL_NOT_CONFIRMED")
		}
		if (!(await bcrypt.compare(password, user.password))) {
			Logger.log("⛔ login: throw : INVALID_CREDENTIALS")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}

		if (!user.jwt) {
			const jwt = await this.authService.getAccessToken(user)
			user = await this.usersService.setJwt(user, jwt)
		}

		Logger.log(`🟢 login: "${user.username}"`)
		return {
			user: user,
		}
	}

	/*
	 *	CHECK TOKEN_EMAIL
	 *
	 *	1) find User by emailValidationToken
	 *	2) set emailValidationToken to null
	 *	3) return success
	 *
	 */
	@Public()
	@Post("confirm-email")
	async confirmEmail(@Body("tokenEmail") tokenEmail: string) {
		if (!tokenEmail) {
			Logger.log("⛔ login: throw : MISSING_FIELDS")
			throw new BadRequestException("MISSING_FIELDS")
		}

		// TODO : check VALIDE : tokenEmail

		let user = await this.usersService.findOneByEmailValidationToken(tokenEmail)
		if (!user) {
			Logger.log("⛔ login: throw : INVALID_TOKEN")
			throw new BadRequestException("INVALID_TOKEN")
		}
		await this.usersService.clearEmailValidationToken(user)
		return {
			success: 1,
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
