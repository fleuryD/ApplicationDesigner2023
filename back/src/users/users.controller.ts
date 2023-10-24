// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Controller, Get, Param, Headers } from "@nestjs/common"

import { UsersService } from "./"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/*
	 * *************************************************************************
	 *
	 * 	GET ALL USERS
	 *
	 */
	@Get("/")
	async users(@Headers() headers) {
		const users = await this.usersService.findAll()
		return {
			users: users,
		}
	}

	/*
	 * *************************************************************************
	 *
	 * 	GET USER TARGETED BY :id
	 *
	 */
	@Get("/:id")
	async userShow(@Param() params, @Headers() headers) {
		const user = await this.usersService.findOneById(params.id)
		const { password, ...result } = user
		return {
			user: user,
		}
	}
}
