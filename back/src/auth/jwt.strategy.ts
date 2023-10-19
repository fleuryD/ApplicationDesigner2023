import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { jwtConstants } from "./constants"
import { Logger } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true, // !!!!!!!!ignoreExpiration: just to be explicit, we choose the default false setting, which delegates the responsibility of ensuring that a JWT has not expired to the Passport module. This means that if our route is supplied with an expired JWT, the request will be denied and a 401
			secretOrKey: jwtConstants.secret,
		})
		Logger.log("⚪⚪⚪ ")
	}

	async validate(payload: any) {
		Logger.log("⚪ payload", payload)
		return { userId: payload.sub, username: payload.username }
	}
}
