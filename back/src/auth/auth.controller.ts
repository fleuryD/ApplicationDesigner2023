// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {
	BadRequestException,
	UnauthorizedException,
	Body,
	Controller,
	Post,
} from "@nestjs/common"
import { UsersService } from "../users/users.service"
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { Logger } from "@nestjs/common"
import { Public } from "./jwt-auth.guard"
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

	/*
	 * *************************************************************************
	 *
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

		// TODO : set : tokenEmail expire date

		try {
			let user = await this.usersService.create({
				username: username, //.toLowerCase(),
				email: email.toLowerCase(),
				password: hashedPassword,
			})

			user = await this.usersService.setNewEmailValidationToken(user)

			await this.mailService.sendEmailValidation(user)

			return {
				success: 1,
				// debugEmailValidationToken: user.emailValidationToken, // !!!  emailValidationToken ::  debug only
			}
		} catch (e) {
			console.debug("-------error", error)
			throw new BadRequestException("INTERNAL_ERROR")
		}
	}

	/*
	 * *************************************************************************
	 *
	 *	LOGIN
	 *
	 * 1) find User by emailOrUsername
	 * 2) if user not found : throw INVALID_CREDENTIALS
	 * 3) if user.emailValidationToken : throw EMAIL_NOT_CONFIRMED
	 * 4) if password invalid : throw INVALID_CREDENTIALS
	 * 5) if user.accessToken not set : set accessToken
	 * 6) return user (with accessToken)
	 *
	 */
	@Public()
	@Post("login")
	async login(
		@Body("emailOrUsername") emailOrUsername: string,
		@Body("password") password: string
	) {
		Logger.log("[login] 🔵[login] 🔵[login] 🔵[login] 🔵[login] 🔵")
		if (!emailOrUsername || !password) {
			Logger.error("[login] ❌ MISSING_FIELDS")
			throw new BadRequestException("MISSING_FIELDS")
		}

		// TODO : check VALIDE : username, email, password

		let user = await this.usersService.findOneByEmailOrUsername(emailOrUsername)

		if (!user) {
			Logger.warn("[login] ⛔ INVALID_CREDENTIALS_USER_NOT_FOUND")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}
		if (user.emailValidationToken) {
			Logger.warn("[login] ⛔ EMAIL_NOT_CONFIRMED")
			Logger.warn(
				"[login] ⛔ http://localhost:3003/auth/emailconfirm/" +
					user.emailValidationToken
			)
			throw new BadRequestException("EMAIL_NOT_CONFIRMED")
		}

		if (!(await bcrypt.compare(password, user.password))) {
			Logger.warn("[login] ⛔ INVALID_CREDENTIALS_PASSWORD_INVALID")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}

		Logger.log(`[login] 🟢 "${user.username}"`)

		if (!user.accessToken || this.authService.accessTokenHasExpired(user.accessToken)) {
			const accessToken = await this.authService.getAccessToken(user)
			user = await this.usersService.setAccessToken(user, accessToken)
			Logger.log("[login] set new accessToken for user:", user.username)
		}

		return {
			user: {
				accessToken: user.accessToken,
				email: user.email,
				username: user.username,
			},
		}
	}

	/*
	 * *************************************************************************
	 *
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
		// TODO : check : tokenEmail expire date

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
	 * *************************************************************************
	 *
	 *	FORGOTTEN PASSWORD
	 *
	 *
	 */
	@Public()
	@Post("forgotten-password")
	async forgottenPassword(@Body("email") email: string) {
		if (!email) {
			Logger.error("[forgottenPassword] ❌ MISSING_FIELDS")
			throw new BadRequestException("MISSING_FIELDS")
		}

		// TODO : check VALIDE : email

		let user = await this.usersService.findOneByEmail(email)

		if (!user) {
			Logger.warn("[forgottenPassword] ⛔ INVALID_CREDENTIALS")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}
		Logger.log(`[forgottenPassword] 🔵 "${user.username}"`)

		user = await this.usersService.setNewPasswordResetToken(user)

		await this.mailService.sendPasswordReset(user)

		return {
			success: 1,
			//debugPasswordResetToken: user.passwordResetToken, // !!!  debugPasswordResetToken ::  debug only
		}
	}

	/*
	 * *************************************************************************
	 *
	 *	FORGOTTEN PASSWORD
	 *
	 *
	 */
	@Public()
	@Post("reset-password")
	async resetPassword(
		@Body("email") email: string,
		@Body("password") password: string,
		@Body("tokenResetPassword") tokenResetPassword: string
	) {
		if (!email) {
			Logger.error("[resetPassword] ❌ MISSING_FIELDS")
			throw new BadRequestException("MISSING_FIELDS")
		}

		// TODO : check VALIDE : email

		let user = await this.usersService.findOneByEmail(email)

		if (!user) {
			Logger.warn("[resetPassword] ⛔ INVALID_CREDENTIALS")
			throw new BadRequestException("INVALID_CREDENTIALS")
		}

		Logger.log(`[resetPassword] 🔵 "${user.username}"`)

		if (user.passwordResetToken !== tokenResetPassword) {
			Logger.warn("[resetPassword] ⛔ INVALID_TOKEN")
			throw new BadRequestException("INVALID_TOKEN")
		}

		// TODO : check date reset token

		user = await this.usersService.resetPassword({ user, plainPassword: password })

		Logger.log("[resetPassword]  new password set for user:", user.username)

		return { success: 1 }
	}

	/*
	 * *************************************************************************
	 *
	 * 	XXXXXXXXXXXXXXXXXXXXXXXXXXX
	 *
	 */
	/*
	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("accessToken")

		return { success: 1 }
	}
	*/
}
