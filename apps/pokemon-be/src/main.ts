import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CLIENT_URL || `http://localhost:4200`,
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
