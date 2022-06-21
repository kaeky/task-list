import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation Task List')
    .setDescription('Prueba Tecnica Node.js Desarrollador back-end')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('task')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
