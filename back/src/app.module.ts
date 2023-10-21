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
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "./auth/jwt-auth.guard"

import { MailerModule } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailModule } from "./mail/mail.module"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘
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
			signOptions: { expiresIn: "10d" },
		}),

		TypeOrmModule.forFeature([User, Project, Entite, Attribut]),

		MailModule,
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
