// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { MailerService } from "@nestjs-modules/mailer"
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common"
import { User } from "../_entities"
import {
	CONST_FRONT_EMAIL_VALIDATION_URL,
	CONST_FRONT_RESET_PASSWORD_URL,
} from "src/constants"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async sendEmailValidation(user: User) {
		//try {
		const url = CONST_FRONT_EMAIL_VALIDATION_URL + user.emailValidationToken
		await this.mailerService.sendMail({
			to: user.email,
			// from: '"Support Team" <support@example.com>', // override default from
			subject: "ApplicationDesigner: Confirm your Email",
			template: "./email-confirmation",
			context: {
				username: user.username,
				url,
			},
		})
		//	} catch (e) {
		//		console.debug("-------error", e)
		//		throw new InternalServerErrorException("sendmailllllll", e)
		//	}
	}

	async sendPasswordReset(user: User) {
		const url = CONST_FRONT_RESET_PASSWORD_URL + user.passwordResetToken
		await this.mailerService.sendMail({
			to: user.email,
			// from: '"Support Team" <support@example.com>', // override default from
			subject: "ApplicationDesigner: Reset your password",
			template: "./password-reset",
			context: {
				username: user.username,
				url,
			},
		})
	}
}
