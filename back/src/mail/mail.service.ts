// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"
import { User } from "../_entities"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	// ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘ ◘

	async sendEmailValidation(user: User) {
		const url = process.env.FRONT_EMAIL_VALIDATION_URL + user.emailValidationToken
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
	}

	async sendPasswordReset(user: User) {
		const url = process.env.FRONT_RESET_PASSWORD_URL + user.passwordResetToken
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
