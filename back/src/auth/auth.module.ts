// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersService } from "../users/users.service"
import { AuthService } from "./auth.service"
import { User } from "../users/user.entity"
import { JwtService } from "@nestjs/jwt"
import { UsersModule } from "../users/users.module"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./local.strategy"
import { JwtStrategy } from "./jwt.strategy"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [UsersModule, TypeOrmModule.forFeature([User]), PassportModule, ,],
	//exports: [TypeOrmModule],
	providers: [AuthService, LocalStrategy, UsersService, JwtService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
