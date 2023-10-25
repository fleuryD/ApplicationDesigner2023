// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}
	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	/*
	async validateUser(username: string, pass: string): Promise<any> {
		// todo bcrypt
		Logger.log("🟠 username", username)
		Logger.log("🟠 pass", pass)
		const user = await this.usersService.findOne(username)
		Logger.log("🟠 user", user)
		/*
		if (user && user.password === pass) {
			const { password, ...result } = user
			return result
		} * /
		if (user && (await bcrypt.compare(pass, user.password))) {
			const { password, ...result } = user
			return result
		}
		return null
	}
	*/

	/*
	async login(user: any) {
		console.log("🟦 AuthService login")
		const payload = { username: user.username, sub: user.userId }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
	*/
	async getAccessToken(user: any) {
		const payload = { username: user.username, userId: user.id }
		return this.jwtService.sign(payload)
	}

	async getEmailValidationToken(user: any) {
		const payload = { username: user.username, userId: user.id }
		return this.jwtService.sign(payload)
	}

	async accessTokenHasExpired(accessToken: string) {
		try {
			const decoded = this.jwtService.verify(accessToken)
			return 0
		} catch (error) {
			// Gérer l'erreur d'expiration du jeton ici
			// console.warn("[accessTokenHasExpired]::error", error.name)
			return 1
		}
	}
}
