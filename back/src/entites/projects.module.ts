// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EntitesService } from "./entites.service"
import { EntitesController } from "./entites.controller"
import { Entite } from "./entite.entity"
import { User } from "../users/user.entity"
import { UsersService } from "../users/users.service"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Module({
	imports: [TypeOrmModule.forFeature([Entite, User])],
	exports: [TypeOrmModule],
	providers: [EntitesService, UsersService],
	controllers: [EntitesController],
})
export class EntitesModule {}
