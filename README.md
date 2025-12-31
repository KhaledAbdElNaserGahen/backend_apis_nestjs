# NestJS Silent Connect API

Complete conversion of Laravel backend to NestJS with TypeScript.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend_apis_nestjs
npm install
```

### 2. Configure Environment

Update `.env` file with your database credentials:

```env
DB_HOST=sql305.infinityfree.com
DB_PORT=3306
DB_USERNAME=if0_40794161
DB_PASSWORD=if0_40794161
DB_DATABASE=if0_40794161_epiz_12345678_silent
JWT_SECRET=your-secret-key-here
```

### 3. Run Locally

```bash
# Development mode (auto-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

API will run on: `http://localhost:3000/api/v1`

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication (`/auth`)
- ✅ `POST /auth/register` - Register new user
- ✅ `POST /auth/login` - User login
- ✅ `GET /auth/profile` - Get user profile (requires auth)
- ✅ `POST /auth/update-profile` - Update profile (requires auth)
- ✅ `POST /auth/logout` - Logout (requires auth)

### Clinics (`/clinics`)
- ✅ `GET /clinics` - Get all clinics
- ✅ `GET /clinics/:id` - Get clinic details
- ✅ `GET /clinics/:id/doctors` - Get clinic doctors

### Pharmacy (`/pharmacy`)
- ✅ `GET /pharmacy` - Get user prescriptions

### Videos (`/videos`)
- 🔄 `GET /videos` - List videos
- 🔄 `POST /videos/upload` - Upload video
- 🔄 `GET /videos/my-videos` - My videos

### Messages (`/messages`)
- 🔄 `GET /messages/conversations` - Get conversations
- 🔄 `GET /messages/:userId` - Get messages
- 🔄 `POST /messages/send` - Send message

### Emergency (`/emergency`)
- 🔄 `GET /emergency/services` - Get services
- 🔄 `POST /emergency/request` - Create request

### Settings (`/settings`)
- 🔄 `GET /settings` - Get settings
- 🔄 `PUT /settings` - Update settings

### Notifications (`/notifications`)
- 🔄 `GET /notifications` - Get notifications
- 🔄 `PUT /notifications/:id/read` - Mark as read

### Family (`/family`)
- 🔄 `GET /family` - Get family members
- 🔄 `POST /family` - Add member

### Admin (`/admin`)
- 🔄 `GET /admin/users` - Get all users (SuperAdmin)
- 🔄 `PUT /admin/users/role` - Update user role

---

## 🚀 Deploy to Free Platforms

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd backend_apis_nestjs
vercel
```

3. Add environment variables in Vercel dashboard

**Your API URL:** `https://your-project.vercel.app/api/v1`

### Deploy to Render.com

1. Push to GitHub
2. Connect repository to Render
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`
5. Add environment variables

### Deploy to Railway.app

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Deploy:
```bash
railway login
railway init
railway up
```

---

## 📦 Project Structure

```
backend_apis_nestjs/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── guards/        # JWT guards
│   │   ├── strategies/    # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/             # Users module
│   ├── clinics/           # Clinics module
│   ├── pharmacy/          # Pharmacy module
│   ├── videos/            # Videos module
│   ├── messages/          # Messages module
│   ├── emergency/         # Emergency module
│   ├── settings/          # Settings module
│   ├── notifications/     # Notifications module
│   ├── family/            # Family module
│   ├── admin/             # Admin module
│   ├── app.module.ts      # Root module
│   └── main.ts            # Entry point
├── .env                   # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🔐 Authentication

Uses JWT (JSON Web Tokens) instead of Laravel Sanctum.

**How it works:**
1. User registers/logs in
2. Server returns JWT token
3. Client sends token in `Authorization: Bearer {token}` header
4. Server validates token for protected routes

---

## 🗄️ Database

Uses TypeORM with MySQL.

**Auto-create tables:**
- Set `synchronize: true` in development (in `app.module.ts`)
- Tables are created automatically from entities
- In production, use migrations

---

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:cov
```

---

## 📝 Update Flutter App

Change API URLs in Flutter controllers:

```dart
// lib/config/api_config.dart
class ApiConfig {
  static const String baseUrl = 'https://your-nestjs-api.vercel.app/api/v1';
  
  static String get loginUrl => '$baseUrl/auth/login';
  static String get registerUrl => '$baseUrl/auth/register';
  // ... other endpoints
}
```

---

## ✅ What's Converted

✅ Authentication (Register, Login, Profile)  
✅ User Management  
✅ Clinics Module  
✅ Pharmacy Module  
✅ JWT Authentication (replaces Sanctum)  
✅ Database Connection (TypeORM)  
✅ CORS Enabled  
✅ Validation Pipes  
✅ Environment Configuration  

🔄 **To Complete:**
- Videos, Messages, Emergency, Settings, Notifications, Family, Admin modules (stub created)
- File upload handling
- Role-based guards
- Password reset flow

---

## 💡 Advantages of NestJS

✅ **Better Free Hosting** - Vercel, Render, Railway, Fly.io all support Node.js  
✅ **TypeScript** - Type safety and better IDE support  
✅ **Modular Architecture** - Easy to maintain and scale  
✅ **Auto API Documentation** - Can add Swagger easily  
✅ **Real-time Support** - Easy to add WebSockets  
✅ **Modern Stack** - Industry standard  

---

## 📞 Support

- NestJS Docs: https://docs.nestjs.com
- TypeORM Docs: https://typeorm.io

---

**Your Laravel API is now converted to NestJS! 🎉**
