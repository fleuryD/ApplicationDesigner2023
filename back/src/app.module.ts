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

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // no need to import into other modules
		}),
		TypeOrmModule.forRoot({
			type: process.env.DB_TYPE === "postgres" ? "postgres" : "mysql",
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT, 10) || 5432,
			database: process.env.DB_NAME,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			synchronize: process.env.DB_SYNCHRONIZE_WITH_ENTITIES === "true",
			entities: [User, Project, Entite, Attribut],
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
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
