import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Logger } from "@nestjs/common"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	canActivate(context: ExecutionContext) {
		Logger.log("🟠 canActivate:")
		// Add your custom authentication logic here
		// for example, call super.logIn(request) to establish a session.
		return super.canActivate(context)
	}

	handleRequest(err, user, info) {
		Logger.log("🟠 handleRequest::err:", err)
		Logger.log("🟠 handleRequest::user:", user)
		Logger.log("🟠 handleRequest::info:", info)
		// You can throw an exception based on either "info" or "err" arguments
		if (err || !user) {
			throw err || new UnauthorizedException()
		}
		return user
	}
}
