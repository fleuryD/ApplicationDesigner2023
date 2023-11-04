// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { CustomLogger } from "./custom-logger.service"
import { CONST_BACK_PORT } from "./constants"

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
		/* logger: console, */
	})
	app.enableCors({
		allowedHeaders: "*",
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: false,
	})
	app.useLogger(app.get(CustomLogger))
	await app.listen(CONST_BACK_PORT)
}
bootstrap()
