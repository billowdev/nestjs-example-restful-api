import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SERVEPORT } from './@core/constants';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('nestjs example project')
    .setDescription('The example project nestjs with sequelize swagger')
    .setVersion('1.0')
    .addTag('nestjs example project')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/document', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
 
  await app.listen(SERVEPORT);
}
bootstrap();
