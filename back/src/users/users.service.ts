// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async create(user: any): Promise<User> {
		return this.usersRepository.save(user) // ????????? await
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find()
	}

	async findOne(condition: any): Promise<User> {
		return this.usersRepository.findOne(condition)
	}

	async findOneById(id: number): Promise<User | null> {
		return this.usersRepository.findOne({
			where: {
				id: id,
			},
		})
		//return this.usersRepository.findOneBy({ id })
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id)
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async findOneByEmailOrUsername(emailOrUsername: string): Promise<User | undefined> {
		let user = await this.usersRepository.findOne({
			where: {
				email: emailOrUsername,
			},
		})
		if (user) return user
		user = await this.usersRepository.findOne({
			where: {
				username: emailOrUsername,
			},
		})
		if (user) return user
		return undefined
	}

	async setJwt(user, jwt): Promise<User> {
		user.jwt = jwt
		await this.usersRepository.save(user)
		return user
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	/*
	async getUserById(id: number) {
		const message = await this.usersRepository.findOne({
			where: {
				id: id,
			},
		})
		if (message) {
			return message
		}
		////throw new NotFoundException("Could not find the message")
	}
	*/

	/*
	async findOneByEmailOrUsername_xxxxxxxxxxxxxxxxxxxxxxxx(emailOrUsername: string	): Promise<User | undefined> {
		const users: Array<User> = await this.usersRepository
			.createQueryBuilder()
			//.select(["id", "phone", "username"])
			.where("email = :emailOrUsername", { emailOrUsername })
			.orWhere("username = :emailOrUsername", { emailOrUsername })
			.limit(1)
			.execute()
		if (users && users.length) {
			return users[0]
		}
		return undefined
	}
	*/
}
