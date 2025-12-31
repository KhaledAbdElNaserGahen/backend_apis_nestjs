import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'Silent Connect API is running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        docs: 'Use /api/v1 prefix for all endpoints',
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        clinics: '/api/v1/clinics',
        pharmacy: '/api/v1/pharmacy',
        videos: '/api/v1/videos',
        messages: '/api/v1/messages',
        emergency: '/api/v1/emergency',
        settings: '/api/v1/settings',
        notifications: '/api/v1/notifications',
        family: '/api/v1/family',
        admin: '/api/v1/admin',
      },
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
