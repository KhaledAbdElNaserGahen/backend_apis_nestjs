import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let cachedApp;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = new ExpressAdapter(server);
    const app = await NestFactory.create(AppModule, expressApp);
    
    // Enable CORS
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    
    // API prefix
    app.setGlobalPrefix('api/v1');
    
    await app.init();
    cachedApp = app;
  }
  
  return cachedApp;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(() => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`🚀 Silent Connect API is running on: http://localhost:${port}/api/v1`);
    });
  });
}

// Export for Vercel serverless
export default async (req, res) => {
  await bootstrap();
  return server(req, res);
};
