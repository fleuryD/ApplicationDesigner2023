// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { Logger } from "@nestjs/common"

import { CONST_JWT_SECRET } from "../constants"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		console.log("*****************CONST_JWT_SECRET :", CONST_JWT_SECRET)
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			/*
			ignoreExpiration:
			the default false setting delegates the responsibility of ensuring that a JWT has not expired to the Passport module.
			This means that if our route is supplied with an expired JWT, the request will be denied and a 401
			*/
			ignoreExpiration: false, // !!!!!!!!
			secretOrKey: CONST_JWT_SECRET,
		})
	}

	async validate(payload: any) {
		// Logger.log("⚪ payload", payload)
		return { id: payload.userId, username: payload.username }
	}
}
