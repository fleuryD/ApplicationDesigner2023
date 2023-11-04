import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    /* logger: console, */
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  await app.listen(3000);
}
bootstrap();
