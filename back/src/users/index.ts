// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/*
 *	usage :
 *
 *	import { User, UsersController, UsersModule, UsersService } from "../users"
 *
 *
 * https://tevpro.com/blog/nestjs-resolving-dependency-injection-the-order-matters
 *
 */

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

export { User } from "./user.entity"
export { UsersService } from "./users.service"
export { UsersController } from "./users.controller"
export { UsersModule } from "./users.module"

/* cause des erreurs:
export * from "./user.entity"
export * from "./users.controller"
export * from "./users.module"
export * from "./users.service"
*/
