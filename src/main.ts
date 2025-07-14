import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Fashion API')
    .setDescription('Fashion & Style Web App API Documentation')
    .setVersion('1.0')
    .addTag('fashion')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // API docs will be at /api

  await app.listen(4000);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
