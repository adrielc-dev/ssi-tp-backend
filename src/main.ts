import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://ssi-tp-frontend.onrender.com',
      'https://jobs-scode.duckdns.org',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}
bootstrap();
