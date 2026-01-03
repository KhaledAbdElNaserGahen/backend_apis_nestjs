import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();
let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    
    // Enable CORS - Allow all origins including localhost
    app.enableCors({
      origin: ['http://localhost:52657', 'http://localhost:8080', 'http://localhost:3000', '*'], // Explicit localhost + wildcard
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
      exposedHeaders: ['Content-Length', 'Content-Type'],
      maxAge: 86400, // 24 hours
    });
    
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    
    // API prefix
    app.setGlobalPrefix('api/v1');
    
    await app.init();
  }
  return expressApp;
}

export default async (req, res) => {
  const server = await bootstrap();
  server(req, res);
};

