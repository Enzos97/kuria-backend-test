import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize()); 
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

   const config = new DocumentBuilder()
   .setTitle('Kiura backend test')
   .setDescription('API to manage movies and series, endpoints')
   .setVersion('1.0')
   .addBearerAuth()
   .addTag('Seeds') 
   .addTag('Auth') 
   .addTag('Admin') 
   .addTag('User') 
   .addTag('Support') 
   .addTag('Category') 
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()

  await app.listen(process.env.PORT||3000);
}
bootstrap();
