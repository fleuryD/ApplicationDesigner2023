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
			entities: [User],
			synchronize: true, // ! false en prod
		}),
		JwtModule.register({
			secret: "secret",
			signOptions: { expiresIn: "1d" },
		}),
		TypeOrmModule.forFeature([User]),
	],

	controllers: [AppController, AuthController],
	providers: [AppService, UsersService],
})
export class AppModule {}
