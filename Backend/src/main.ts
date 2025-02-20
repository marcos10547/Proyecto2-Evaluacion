import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde cualquier origen
  // Puedes ajustar el origin según tus necesidades
  app.enableCors({
    origin: '*',
    // origin: ['http://localhost:8081'], // o la URL de tu front
  });

  await app.listen(process.env.PORT ?? 300);
}
bootstrap();