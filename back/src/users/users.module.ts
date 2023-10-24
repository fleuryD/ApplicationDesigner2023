// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { LocalStrategy } from "src/auth/local.strategy"

// ******
// import { User } from "./user.entity"
// import { UsersController } from "./users.controller"
// import { UsersService } from "./users.service"
import { User, UsersService, UsersController } from "./"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	exports: [TypeOrmModule],
	providers: [UsersService, LocalStrategy],
	controllers: [UsersController],
})
export class UsersModule {}
