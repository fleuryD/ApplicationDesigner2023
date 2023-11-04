// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"
import { AppService } from "./app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from "@nestjs/jwt"
import { LocalStrategy } from "./auth/local.strategy"
import { JwtStrategy } from "./auth/jwt.strategy"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"
import { MailModule } from "./mail/mail.module"

import { User } from "./users"
//import { User } from "./users/user.entity"
import { UsersController } from "./users/users.controller"
import { UsersService } from "./users/users.service"

import { Project, ProjectsController, ProjectsService } from "./projects"
import { Entite, EntitesController, EntitesService } from "./entites"
import { Attribut, AttributsController, AttributsService } from "./attributs"

import { AuthService } from "./_services"
import { AppController } from "./app.controller"
import { AuthController } from "./auth/auth.controller"
import { CustomLogger } from "./custom-logger.service"

import {
	CONST_DB_HOST,
	CONST_DB_NAME,
	CONST_DB_PASSWORD,
	CONST_DB_PORT,
	CONST_DB_SYNCHRONIZE_WITH_ENTITIES,
	CONST_DB_TYPE,
	CONST_DB_USERNAME,
	CONST_JWT_SECRET,
	CONST_JWT_EXPIRES_IN,
} from "./constants"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // no need to import into other modules
		}),
		TypeOrmModule.forRoot({
			type: CONST_DB_TYPE,
			host: CONST_DB_HOST,
			port: CONST_DB_PORT,
			database: CONST_DB_NAME,
			username: CONST_DB_USERNAME,
			password: CONST_DB_PASSWORD,
			synchronize: CONST_DB_SYNCHRONIZE_WITH_ENTITIES,
			entities: [User, Project, Entite, Attribut],
		}),
		JwtModule.register({
			secret: CONST_JWT_SECRET,
			signOptions: { expiresIn: CONST_JWT_EXPIRES_IN },
		}),
		TypeOrmModule.forFeature([User, Project, Entite, Attribut]),
		MailModule,
		CustomLogger,
	],

	providers: [
		{
			// Enable authentication globally :
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		LocalStrategy,
		JwtStrategy,
		AuthService,
		AppService,
		ProjectsService,
		EntitesService,
		AttributsService,
		UsersService,
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
