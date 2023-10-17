// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"

import { AppController } from "./app.controller"

import { AuthController } from "./auth/auth.controller"

import { User } from "./users/user.entity"
import { UsersService } from "./users/users.service"
import { UsersController } from "./users/users.controller"

import { Project } from "./projects/project.entity"
import { ProjectsService } from "./projects/projects.service"
import { ProjectsController } from "./projects/projects.controller"

import { Entite } from "./entites/entite.entity"
import { EntitesService } from "./entites/entites.service"
import { EntitesController } from "./entites/entites.controller"

import { Attribut } from "./attributs/attribut.entity"
import { AttributsService } from "./attributs/attributs.service"
import { AttributsController } from "./attributs/attributs.controller"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "postgres", // "postgres" pour docker | "localhost" pour mon windows
			port: 5432,
			username: "postgres",
			password: "root",
			database: "db_app_designer", // "db" pour docker | "db_app_designer" pour mon windows
			entities: [User, Project, Entite, Attribut],
			synchronize: true, // ! false en prod
		}),
		JwtModule.register({
			secret: "secret", // ! dans .env
			signOptions: { expiresIn: "1d" },
		}),
		TypeOrmModule.forFeature([User, Project, Entite, Attribut]),
	],

	providers: [
		AppService,
		UsersService,
		ProjectsService,
		EntitesService,
		AttributsService,
	],

	controllers: [
		AppController,
		AuthController,
		UsersController,
		ProjectsController,
		EntitesController,
		AttributsController,
	],
})
export class AppModule {}
