// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	usage :
 *
 *	import { User, UsersController, UsersModule, UsersService } from "../users"
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export * from "./user.entity"
export * from "./users.controller"
export * from "./users.module"
export * from "./users.service"

/*

en nest js  j'ai plusieurs fichier dans le dossier users :

user.entity.ts
users.controller.ts
users.module.ts
users.service.ts


j'ai creer dans ce dossier un fichier index.ts avec le code :


export { User } from "./user.entity"
export { UsersController } from "./users.controller"
export { UsersModule } from "./users.module"
export { UsersService } from "./users.service"

Je veux ensuite faire:
 import { User, UsersController, UsersModule, UsersService } from "../users"


 */

/*
 dans users.controller.ts :


@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService
	) {}


j'ai l'erreur
ERROR [ExceptionHandler] Nest can't resolve dependencies of the UsersController (?, JwtService). Please make sure that the argument dependency at index [0] is available in the AppModule context.
*/
