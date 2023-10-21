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
import { AuthService } from "./auth/auth.service"
import { LocalStrategy } from "./auth/local.strategy"
import { JwtStrategy } from "./auth/jwt.strategy"
import { jwtConstants } from "./auth/constants"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost", // "postgres" pour docker | "localhost" pour mon windows // ! .env
			port: 5432, // ! .env
			username: "postgres", // ! .env
			password: "root", // ! .env
			database: "db_app_designer", // "db" pour docker | "db_app_designer" pour mon windows // ! .env
			entities: [User, Project, Entite, Attribut],
			synchronize: true, // ! false en prod
		}),

		JwtModule.register({
			secret: jwtConstants.secret, // ! dans .env
			signOptions: { expiresIn: "10d" },
		}),

		TypeOrmModule.forFeature([User, Project, Entite, Attribut]),
	],

	providers: [
		{
			// Enable authentication globally :
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		LocalStrategy, // * ne pas oublier
		JwtStrategy, // * ne pas oublier
		AuthService,
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
