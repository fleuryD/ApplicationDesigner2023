// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"
import { User } from "./users"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class AppService {
	constructor(private dataSource: DataSource) {}

	getHello(): string {
		return "Hello World! From NEST JS"
	}

	/*
	async fixtureTest(user: User) {
		const prok = await this.dataSource.query(
			"SELECT * FROM projects ORDER BY id DESC LIMIT 100"
		)

		const xxxccc = await this.dataSource.query(
			`INSERT INTO projects (name, created_by_id)
 				VALUES
				('projet 1'),
				('projet 2'),
				('projet 3'),
				('projet 4'),
				('projet 5');`
		)
		/ *
		const xxx = await this.dataSource.query(
			`INSERT INTO projects (name, created_by_id)
 				VALUES
				('projet 1', ${user.id}),
				('projet 2', ${user.id}),
				('projet 3', ${user.id}),
				('projet 4', ${user.id}),
				('projet 5', ${user.id});`
		)
		* /

		const users = await this.dataSource.query(
			"SELECT * FROM entites ORDER BY id DESC LIMIT 100"
		)
		console.log(users)
	}
	*/
}
