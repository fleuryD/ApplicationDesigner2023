// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { MailerModule } from "@nestjs-modules/mailer"
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { Global, Module } from "@nestjs/common"
import { MailService } from "./mail.service"
import { join } from "path"
import { ConfigModule, ConfigService } from "@nestjs/config"
import {
	CONST_MAIL_HOST,
	CONST_MAIL_USER,
	CONST_MAIL_PASSWORD,
	CONST_MAIL_FROM,
} from "src/constants"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

@Global() // global module
@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: CONST_MAIL_HOST,
					secure: false,
					auth: {
						user: CONST_MAIL_USER,
						pass: CONST_MAIL_PASSWORD,
					},
					tls: { rejectUnauthorized: false }, //! sinon :  Error: unable to get local issuer certificate
				},
				defaults: {
					from: CONST_MAIL_FROM,
				},
				template: {
					dir: join(__dirname, "templates"),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
