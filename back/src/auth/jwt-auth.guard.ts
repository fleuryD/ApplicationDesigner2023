// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	SetMetadata,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Logger } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

const IS_PUBLIC_KEY = "isPublic"
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (isPublic) {
			Logger.debug("[canActivate] isPublic::true")
			return true
		}
		//Logger.log("[canActivate]")

		// Add your custom authentication logic here
		// for example, call super.logIn(request) to establish a session.
		return super.canActivate(context)
	}

	handleRequest(err, user, info) {
		if (info?.name === "TokenExpiredError") {
			Logger.warn("[JwtAuthGuard::handleRequest] ⛔ ERROR_ACCESS_TOKEN_EXPIRED")
			throw new UnauthorizedException("ERROR_ACCESS_TOKEN_EXPIRED")
		}

		// console.table(info)
		// if (err)  Logger.debug("[JwtAuthGuard::handleRequest] err:", err)
		// if (info) Logger.debug("[JwtAuthGuard::handleRequest] info:", info)
		// if (user) Logger.debug("[JwtAuthGuard::handleRequest] user:", user)

		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException()
		}
		return user
	}
}
