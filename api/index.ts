export default async (req, res) => {
  try {
    console.log('[START] Request received:', req.method, req.url);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      console.log('[OPTIONS] Sending 204');
      res.status(204).end();
      return;
    }
    
    console.log('[IMPORT] Loading dependencies...');
    const { NestFactory } = require('@nestjs/core');
    const { ValidationPipe } = require('@nestjs/common');
    const { AppModule } = require('../dist/app.module');
    
    console.log('[BOOTSTRAP] Creating NestJS app...');
    const nestApp = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    console.log('[CORS] Enabling CORS...');
    nestApp.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
      exposedHeaders: ['Content-Type', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    
    console.log('[PIPES] Setting up validation...');
    nestApp.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    
    console.log('[PREFIX] Setting global prefix...');
    nestApp.setGlobalPrefix('api/v1');
    
    console.log('[INIT] Initializing app...');
    await nestApp.init();
    
    console.log('[HANDLER] Getting HTTP adapter...');
    const httpAdapter = nestApp.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    
    console.log('[EXECUTE] Running handler...');
    instance(req, res);
  } catch (error) {
    console.error('[ERROR] Handler error:', error);
    console.error('[STACK]', error.stack);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message,
      stack: error.stack,
      details: 'Check Vercel logs for more information'
    });
  }
};
