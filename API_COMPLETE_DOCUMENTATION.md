# 🚀 NestJS Backend - Complete API Documentation

## All 7 Missing Modules Now Implemented!

---

## ✅ Completed Modules (All Implemented)

### 1. **Videos Module** ✅
Full video upload and management system with file handling.

**Endpoints:**
```
POST   /api/v1/videos/upload - Upload video with thumbnail
GET    /api/v1/videos - List all active videos
GET    /api/v1/videos/my-videos - User's videos
GET    /api/v1/videos/category/:category - Filter by category
GET    /api/v1/videos/:id - Get video details (increments views)
PUT    /api/v1/videos/:id - Update video
DELETE /api/v1/videos/:id - Delete video
```

**Upload Example:**
```bash
curl -X POST http://localhost:3000/api/v1/videos/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "video=@video.mp4" \
  -F "thumbnail=@thumb.jpg" \
  -F "title=Sign Language Tutorial" \
  -F "description=Learn basic signs" \
  -F "category=sign_language"
```

**Categories:** `sign_language`, `medical`, `educational`, `emergency`, `general`

---

### 2. **Messages Module** ✅
Real-time chat system with WebSocket support.

**REST Endpoints:**
```
GET    /api/v1/messages/conversations - Get all conversations
GET    /api/v1/messages/:userId - Get messages with specific user
POST   /api/v1/messages/send - Send message
PUT    /api/v1/messages/:id/read - Mark message as read
PUT    /api/v1/messages/:userId/read-all - Mark all as read
DELETE /api/v1/messages/:id - Delete message
```

**WebSocket Events:**
```javascript
// Client connects
socket.emit('join', { userId: 123 });

// Send message
socket.emit('sendMessage', {
  senderId: 123,
  receiverId: 456,
  message: 'Hello',
  messageType: 'text'
});

// Typing indicator
socket.emit('typing', {
  senderId: 123,
  receiverId: 456,
  isTyping: true
});

// Listen for new messages
socket.on('newMessage', (data) => {
  console.log('New message:', data);
});

// Listen for typing
socket.on('userTyping', (data) => {
  console.log('User typing:', data);
});
```

**Message Types:** `text`, `image`, `video`, `audio`

---

### 3. **Emergency Module** ✅
Emergency services and requests management.

**Endpoints:**
```
GET  /api/v1/emergency/services - Get emergency services list
POST /api/v1/emergency/request - Create emergency request
GET  /api/v1/emergency/my-requests - User's requests
GET  /api/v1/emergency/requests - All requests (admin)
PUT  /api/v1/emergency/requests/:id/status - Update status
```

**Service Types:** `ambulance`, `police`, `fire`, `electricity`, `other`

**Request Example:**
```json
{
  "serviceId": 1,
  "location": "123 Main St, Cairo",
  "latitude": 30.0444,
  "longitude": 31.2357,
  "description": "Medical emergency"
}
```

**Request Status:** `pending`, `in_progress`, `completed`, `cancelled`

---

### 4. **Settings Module** ✅
User preferences and settings.

**Endpoints:**
```
GET /api/v1/settings - Get user settings
PUT /api/v1/settings - Update settings
```

**Settings Structure:**
```json
{
  "language": "ar",
  "notifications_enabled": true,
  "sound_enabled": true,
  "vibration_enabled": true,
  "font_size": "medium",
  "theme": "light",
  "show_online_status": true
}
```

**Options:**
- `language`: `ar`, `en`
- `font_size`: `small`, `medium`, `large`
- `theme`: `light`, `dark`

---

### 5. **Notifications Module** ✅
Push notifications with WebSocket real-time delivery.

**REST Endpoints:**
```
GET    /api/v1/notifications - Get notifications
GET    /api/v1/notifications/unread-count - Unread count
PUT    /api/v1/notifications/:id/read - Mark as read
PUT    /api/v1/notifications/read-all - Mark all as read
DELETE /api/v1/notifications/:id - Delete notification
DELETE /api/v1/notifications - Delete all
```

**WebSocket Events:**
```javascript
// Join notifications
socket.emit('joinNotifications', { userId: 123 });

// Listen for notifications
socket.on('newNotification', (notification) => {
  console.log('New notification:', notification);
});
```

**Notification Types:** `appointment`, `message`, `emergency`, `system`, `prescription`

---

### 6. **Family Module** ✅
Family members management.

**Endpoints:**
```
GET    /api/v1/family - Get family members
GET    /api/v1/family/:id - Get specific member
POST   /api/v1/family - Add family member
PUT    /api/v1/family/:id - Update member
DELETE /api/v1/family/:id - Delete member
```

**Family Member Structure:**
```json
{
  "name": "Ahmed Ali",
  "relationship": "child",
  "national_id": "12345678901234",
  "phone": "01234567890",
  "age": 10,
  "gender": "male",
  "medical_info": "No allergies",
  "notes": "Additional notes"
}
```

**Relationships:** `parent`, `spouse`, `child`, `sibling`, `other`

---

### 7. **Admin Module** ✅
Complete admin panel with role-based access control.

**Endpoints (SuperAdmin Only):**
```
GET    /api/v1/admin/users - Get all users
GET    /api/v1/admin/statistics - System statistics
PUT    /api/v1/admin/users/role - Update user role
POST   /api/v1/admin/users/approve - Approve/suspend user
POST   /api/v1/admin/clinics - Create clinic
DELETE /api/v1/admin/users/:id - Delete user
```

**Role Guard Usage:**
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
```

**User Roles:** `patient`, `doctor`, `secretary`, `employee`, `superadmin`

**User Status:** `pending`, `active`, `suspended`

---

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
cd backend_apis_nestjs
npm install
```

### 2. Create Uploads Directory
```bash
mkdir -p uploads/videos
mkdir -p uploads/images
mkdir -p uploads/media
```

### 3. Configure Environment
Create `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=silent_connect
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3000
```

### 4. Run Database Migrations
```bash
# TypeORM will auto-create tables in development
npm run start:dev
```

### 5. Start Server
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## 🔐 Authentication

All endpoints (except auth routes) require JWT token:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

**Get Token:**
```bash
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

---

## 🌐 WebSocket Connection

**Connect to WebSocket:**
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  auth: {
    token: 'YOUR_JWT_TOKEN'
  }
});

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});
```

---

## 📂 File Upload

**Multer Configuration:**
- Max file size: 100MB for videos
- Allowed video types: All video/* mime types
- Allowed image types: All image/* mime types
- Storage: Local disk (`./uploads/videos/`)

**Upload Path Structure:**
```
uploads/
├── videos/
│   ├── video-1234567890-123456789.mp4
│   └── thumbnail-1234567890-987654321.jpg
├── images/
└── media/
```

---

## 🧪 Testing Endpoints

### Using cURL

**Get Videos:**
```bash
curl -X GET http://localhost:3000/api/v1/videos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Send Message:**
```bash
curl -X POST http://localhost:3000/api/v1/messages/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiverId": 2,
    "message": "Hello!",
    "message_type": "text"
  }'
```

**Create Emergency Request:**
```bash
curl -X POST http://localhost:3000/api/v1/emergency/request \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": 1,
    "location": "Cairo",
    "description": "Need ambulance"
  }'
```

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Render
1. Connect GitHub repo
2. Build: `npm install && npm run build`
3. Start: `npm run start:prod`

### Deploy to Railway
```bash
railway login
railway init
railway up
```

---

## 📊 Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

---

## 🔄 Real-time Features

### Messages (WebSocket)
- Instant message delivery
- Typing indicators
- Read receipts
- Online status

### Notifications (WebSocket)
- Real-time notifications
- Push to specific users
- Broadcast to all users

---

## 🛡️ Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Role-Based Access Control (RBAC)** - Guards for admin routes
3. **Input Validation** - class-validator DTOs
4. **CORS Enabled** - Configured for cross-origin requests
5. **File Type Validation** - Only allowed mime types
6. **SQL Injection Protection** - TypeORM parameterized queries

---

## 📈 Performance

- **Database Indexing** - Foreign keys and common queries indexed
- **Eager/Lazy Loading** - Optimized entity relations
- **Pagination Ready** - Easy to add to list endpoints
- **Caching** - Can add Redis for sessions

---

## 🔧 Advanced Features

### Add Pagination
```typescript
@Get()
async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
  const [items, total] = await this.service.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });
  return { items, total, page, limit };
}
```

### Add Search
```typescript
@Get('search')
async search(@Query('q') query: string) {
  return await this.repository
    .createQueryBuilder('item')
    .where('item.title LIKE :query', { query: `%${query}%` })
    .getMany();
}
```

---

## 📝 Environment Variables

```env
# Database
DB_HOST=sql305.infinityfree.com
DB_PORT=3306
DB_USERNAME=if0_40794161
DB_PASSWORD=your_password
DB_DATABASE=if0_40794161_silent_connect

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRATION=7d

# App
NODE_ENV=production
PORT=3000

# Upload
MAX_FILE_SIZE=104857600
UPLOAD_PATH=./uploads
```

---

## ✅ Complete Feature List

### ✅ Implemented (11 Modules)
1. ✅ Auth Module (Login, Register, Profile, Logout)
2. ✅ Users Module (User management)
3. ✅ Clinics Module (Clinics & doctors)
4. ✅ Pharmacy Module (Prescriptions)
5. ✅ Videos Module (Upload, manage, view)
6. ✅ Messages Module (Chat + WebSocket)
7. ✅ Emergency Module (Services & requests)
8. ✅ Settings Module (User preferences)
9. ✅ Notifications Module (Alerts + WebSocket)
10. ✅ Family Module (Family members)
11. ✅ Admin Module (User management + RBAC)

---

## 🎯 Next Steps

1. **Deploy to production** (Vercel/Render/Railway)
2. **Update Flutter app** to use new endpoints
3. **Add pagination** to list endpoints
4. **Implement caching** with Redis
5. **Add API rate limiting**
6. **Set up monitoring** (Sentry, DataDog)
7. **Add unit tests** for services
8. **Generate Swagger docs** (@nestjs/swagger)

---

## 📞 Support

- **NestJS Docs:** https://docs.nestjs.com
- **TypeORM Docs:** https://typeorm.io
- **Socket.IO Docs:** https://socket.io/docs

---

**All 7 missing modules are now complete! 🎉**
