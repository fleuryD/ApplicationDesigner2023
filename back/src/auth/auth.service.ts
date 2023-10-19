// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { Logger } from "@nestjs/common"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}
	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

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
		//const payload = { username: user.username, sub: user.userId }
		const payload = { username: user.username, userId: user.id }

		console.log("🟦 AuthService getAccessToken:payload: ", payload)

		return this.jwtService.sign(payload)
	}
}
