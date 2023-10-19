// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersService } from "../users/users.service"
import { AuthService } from "./auth.service"
//import { UsersController } from "./users.controller"
import { User } from "../users/user.entity"
import { JwtService } from "@nestjs/jwt"
import { UsersModule } from "../users/users.module"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./local.strategy"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forFeature([User]),
		PassportModule,
		//PassportModule.register({			defaultStrategy: "local",})
		/* */
		,
	],
	//exports: [TypeOrmModule],
	providers: [AuthService, LocalStrategy, UsersService, JwtService],
	controllers: [AuthController],
})
export class AuthModule {}
