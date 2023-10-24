import { Module, Global } from "@nestjs/common"
import { CustomLogger } from "./custom-logger.service"
import { LoggingInterceptor } from "./custom-logger.interceptor"

@Global()
@Module({
	providers: [CustomLogger, LoggingInterceptor],
	exports: [CustomLogger],
})
export class LoggerModule {}
