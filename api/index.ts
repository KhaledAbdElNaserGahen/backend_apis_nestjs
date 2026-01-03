import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

let app;
let isBootstrapping = false;

async function bootstrap() {
  if (app) {
    return app;
  }
  
  // Prevent multiple bootstrap attempts
  if (isBootstrapping) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return bootstrap();
  }
  
  try {
    isBootstrapping = true;
    console.log('[Vercel] Bootstrapping NestJS application...');
    
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
    });
    
    // Enable CORS for all origins
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
      exposedHeaders: ['Content-Type', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    
    // Set global prefix for routes
    app.setGlobalPrefix('api/v1');
    
    await app.init();
    
    console.log('[Vercel] NestJS application bootstrapped successfully');
    isBootstrapping = false;
    return app;
  } catch (error) {
    isBootstrapping = false;
    console.error('[Vercel] Bootstrap failed:', error);
    throw error;
  }
}

export default async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    
    console.log(`[Vercel] ${req.method} ${req.url}`);
    
    const nestApp = await bootstrap();
    const httpAdapter = nestApp.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    
    instance(req, res);
  } catch (error) {
    console.error('[Vercel] Handler error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
