// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { BadRequestException, Body, Controller, Post } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { Logger } from "@nestjs/common"
import { Public } from "./jwt-auth.guard"
import { User } from "src/users/user.entity"

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
	async sendMail({ to, subject, html }) {
		// ! mettre ailleurs
		var transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.BK_MAIL_USERNAME,
				pass: process.env.BK_MAIL_PASSWORD,
			},
		})

		var mailOptions = {
			from: process.env.BK_MAIL_USERNAME, // !!! REMPLACER PAR     BK_MAIL_EMAIL    apres rebuild
			to: to,
			subject: subject,
			html: html,
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log("Email sent: " + info.response)
			}
		})
	}

	async sendMailRegisterValidation(user: User) {
		// ! mettre ailleurs

		const urlCheckMail =
			"http://localhost:3001/auth/check-email/" + user.emailValidationToken

		let htmlStr = "<p>Salut <b>" + user.username + "</b><br/>"
		htmlStr +=
			"</b>Valide ton sincription sur <b>Matcha4Geeks</b> en cliquant sur le lien suivant: "
		htmlStr += `<a href="/${urlCheckMail}" target="_blank" rel="noreferrer"	>Verifie ton adresse email</a>`

		htmlStr += "<br /><br />"
		htmlStr += ""
		htmlStr +=
			"Si le lien ne s'affiche pas, t'es un geek, tu sait quoi faire avec l'URL suivante:<br />"
		htmlStr += urlCheckMail
		htmlStr += "<br />Bisous."
		htmlStr += "</p>"

		this.sendMail({
			to: "fleurydavid31@gmail.com", // DEBUG		::			user.email
			subject: "ApplicationDesigner: Validez votre inscription",
			html: htmlStr,
		})
	}
*/

	/*
	 *	REGISTER
	 *
	 *	1) check UNIQUE : username, email
	 *	2) check VALIDE : username, email, password // TODO
	 *	3) hashed password
	 *	3) create user
	 *	3) set emailValidationToken
	 *	4) send email with emailValidationToken // TODO
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

			delete user.password
			return { success: 1, debugEmailValidationToken: user.emailValidationToken }
		} catch (e) {
			throw new BadRequestException("INTERNAL_ERROR")
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

		// !!!! TODO		if (user.token_email) return res.json({ error: "EMAIL_NOT_CONFIRMED" })

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
	 *	CHECK TOKEN_EMAIL
	 *
	 *	1) find User by token_email
	 *	2) set token_email to null
	 *	3) return success
	 *
	 */
	/*
			router.post("/check-email", async function (req, res, next) {
				logRoute(null, "POST", "/auth/check-email")
				const tokenEmail = req.body.tokenEmail

				console.log("tokenEmail", tokenEmail)

				let { user, error } = await getUserAndErrorBy("token_email", tokenEmail)
				if (error) return res.json({ error: "INTERNAL_ERROR" })
				if (!user) return res.json({ error: "USER_NOT_FOUND" })

				user = await clearUserTokenEmail(user)
				res.json({
					success: 1,
					user: user, // DEBUG ONLY
				})
			})
			*/

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
