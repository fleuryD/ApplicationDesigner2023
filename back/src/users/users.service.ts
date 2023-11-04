// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, DataSource } from "typeorm"
import { JwtService } from "@nestjs/jwt"
// import * as bcrypt from "bcrypt" 		////!!!!!!!!!!!!!! BCRYPT !!!!!

import { User } from "./user.entity"
//import { User } from "./"	// !! NON

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class UsersService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private dataSource: DataSource
	) {}

	async test(user: any) {
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		const users = await this.dataSource.query(
			"SELECT * FROM attributs ORDER BY id DESC LIMIT 100"
		)

		console.log(users)
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async create(user: any): Promise<User> {
		return this.usersRepository.save(user) // ????????? await
	}

	async findAll(): Promise<User[]> {
		return this.usersRepository.find()
	}

	async findOne(condition: any): Promise<User | null> {
		return this.usersRepository.findOne(condition)
	}

	async findOneById(id: number): Promise<User | null> {
		return this.usersRepository.findOneBy({ id })
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id)
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async findOneByEmailValidationToken(emailValidationToken: string): Promise<User | null> {
		return this.usersRepository.findOneBy({ emailValidationToken })
	}

	async findOneByUsername(username: string): Promise<User | null> {
		return await this.usersRepository
			.createQueryBuilder()
			.where("LOWER(username) = LOWER(:username)", { username })
			.getOne()
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return await this.usersRepository
			.createQueryBuilder()
			.where("LOWER(email) = LOWER(:email)", { email })
			.getOne()
	}

	async findOneByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
		const user = await this.findOneByUsername(emailOrUsername)
		if (user) return user
		return await this.findOneByEmail(emailOrUsername)
	}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async setAccessToken(user, accessToken): Promise<User> {
		user.accessToken = accessToken
		await this.usersRepository.save(user)
		return user
	}

	async setNewAccessToken(user): Promise<User> {
		user.accessToken = this.jwtService.sign({
			username: user.username,
			userId: user.id,
		})
		await this.usersRepository.save(user)
		return user
	}

	async setNewEmailValidationToken(user): Promise<User> {
		user.emailValidationToken = this.jwtService.sign({
			userId: user.id,
			username: user.username,
		})
		await this.usersRepository.save(user)
		return user
	}
	async clearEmailValidationToken(user): Promise<User> {
		user.emailValidationToken = null
		await this.usersRepository.save(user)
		return user
	}

	async setNewPasswordResetToken(user): Promise<User> {
		user.passwordResetToken = this.jwtService.sign({
			userId: user.id,
			username: user.username,
		})
		await this.usersRepository.save(user)
		return user
	}
	async clearPasswordResetToken(user: User): Promise<User> {
		user.passwordResetToken = null
		await this.usersRepository.save(user)
		return user
	}
	async setHashedPassword(user: User, hashedPassword: string): Promise<User> {
		user.password = hashedPassword
		await this.usersRepository.save(user)
		return user
	}
	async resetPassword({
		user,
		plainPassword,
	}: {
		user: User
		plainPassword: string
	}): Promise<User> {
		//user.password = await bcrypt.hash(plainPassword, 12) ////!!!!!!!!!!!!!! BCRYPT !!!!!
		user.password = plainPassword ////!!!!!!!!!!!!!! BCRYPT !!!!!
		user.passwordResetToken = null
		user.passwordResetAt = null

		await this.usersRepository.save(user)
		return user
	}
}
