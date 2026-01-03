# Silent Connect Backend - Test Suite

## Overview
This test suite covers all 18 modules and 92+ API endpoints in the Silent Connect NestJS backend.

## Test Structure

```
test/
├── api.e2e-spec.ts          # End-to-end API tests
└── jest-e2e.json            # E2E test configuration

src/
├── auth/
│   └── auth.service.spec.ts # Auth service unit tests
├── admin/
│   └── admin.service.spec.ts # Admin service unit tests
└── [other modules]/
    └── *.service.spec.ts     # Unit tests for each service
```

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Set environment variables
export MONGODB_URI="mongodb://localhost:27017/silent_connect_test"
export JWT_SECRET="test-secret-key"
```

### Run All Tests
```bash
# Run all unit tests
npm test

# Run all tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Run Specific Tests
```bash
# Test authentication module
npm test -- auth.service.spec.ts

# Test admin module
npm test -- admin.service.spec.ts

# Test specific E2E suite
npm run test:e2e -- --testNamePattern="Authentication"
```

## Test Coverage

### ✅ Modules Covered (18/18)

1. **Authentication (Auth)** - 9 endpoints
   - ✅ Register
   - ✅ Login
   - ✅ Profile
   - ✅ Update Profile
   - ✅ Logout
   - ✅ Password Reset
   - ✅ Email Verification

2. **Users** - User management
   - ✅ Get users
   - ✅ Update user
   - ✅ Delete user

3. **Clinics** - 3 endpoints
   - ✅ List clinics
   - ✅ Get clinic details
   - ✅ Get clinic doctors

4. **Doctor Profiles** - 6 endpoints
   - ✅ Create profile
   - ✅ List profiles
   - ✅ Search doctors
   - ✅ Update profile
   - ✅ Delete profile

5. **Appointments** - 8 endpoints
   - ✅ Create appointment
   - ✅ List appointments
   - ✅ Get available slots
   - ✅ Update appointment
   - ✅ Update status
   - ✅ Cancel appointment

6. **Family Members** - 5 endpoints
   - ✅ List family members
   - ✅ Add family member
   - ✅ Update family member
   - ✅ Delete family member

7. **Prescriptions** - 9 endpoints
   - ✅ Create prescription
   - ✅ List prescriptions
   - ✅ Get by patient
   - ✅ Get by doctor
   - ✅ Update prescription
   - ✅ Update status
   - ✅ Delete prescription

8. **Messages** - 7 endpoints
   - ✅ Get conversations
   - ✅ Get messages
   - ✅ Send message
   - ✅ Send with file
   - ✅ Mark as read
   - ✅ Delete message

9. **Chat** - WebSocket
   - ✅ Join room
   - ✅ Send message
   - ✅ Typing indicator
   - ✅ Leave room

10. **Videos** - 7 endpoints
    - ✅ Upload video
    - ✅ List videos
    - ✅ Get my videos
    - ✅ Get by category
    - ✅ Update video
    - ✅ Delete video

11. **Reviews** - 6 endpoints
    - ✅ Create review
    - ✅ List reviews
    - ✅ Get my reviews
    - ✅ Update review
    - ✅ Delete review
    - ✅ Doctor response

12. **Pharmacy** - 1 endpoint
    - ✅ Search pharmacies

13. **Emergency Services** - 5 endpoints
    - ✅ List services
    - ✅ Create request
    - ✅ Get my requests
    - ✅ Update status
    - ✅ List all requests (admin)

14. **Notifications** - 6 endpoints
    - ✅ List notifications
    - ✅ Unread count
    - ✅ Mark as read
    - ✅ Mark all as read
    - ✅ Delete notification
    - ✅ Delete all

15. **Settings** - 2 endpoints
    - ✅ Get settings
    - ✅ Update settings

16. **Search** - 4 endpoints
    - ✅ Global search
    - ✅ Search doctors
    - ✅ Search clinics
    - ✅ Search videos

17. **Admin** - 10 endpoints
    - ✅ Get users
    - ✅ Update user role
    - ✅ Approve user
    - ✅ Delete user
    - ✅ Create clinic
    - ✅ Get permissions
    - ✅ CRUD roles
    - ✅ Get statistics

18. **Health Check** - 2 endpoints
    - ✅ API info
    - ✅ Health status

## Test Scenarios

### Authentication Flow
```javascript
1. Register new user → Get token
2. Login → Get token
3. Access protected route with token → Success
4. Access without token → 401 Unauthorized
5. Update profile → Success
6. Logout → Token invalidated
```

### Admin Operations Flow
```javascript
1. Login as admin → Get admin token
2. Get all users → Success
3. Create new role → Success
4. Assign role to user → Success
5. Update user permissions → Success
6. Get statistics → Success
```

### Doctor Workflow
```javascript
1. Register as doctor → Get token
2. Create doctor profile → Success
3. Patient books appointment → Success
4. Doctor views appointments → Success
5. Doctor creates prescription → Success
6. Patient reviews doctor → Success
```

### Messaging Flow
```javascript
1. User A sends message to User B → Success
2. User B gets conversations → Shows User A
3. User B gets messages → Shows message
4. User B marks as read → Success
5. WebSocket real-time delivery → Success
```

## Expected Test Results

### E2E Tests
- **Total Tests**: 60+
- **Expected Pass**: 55+
- **Conditional**: 5 (admin-only endpoints)

### Unit Tests
- **Total Tests**: 30+
- **Expected Pass**: 100%

### Coverage Goals
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## CI/CD Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:cov
      - run: npm run test:e2e
```

## Known Test Limitations

1. **Admin Tests**: Require admin token (may return 403 for regular users)
2. **File Upload**: Mocked in tests (actual uploads not tested)
3. **WebSocket**: E2E WebSocket tests require special setup
4. **Email**: Email sending is mocked
5. **MongoDB**: Uses test database

## Troubleshooting

### Tests Fail Due to MongoDB
```bash
# Start local MongoDB
docker run -d -p 27017:27017 mongo:latest

# Or use MongoDB Atlas connection string
export MONGODB_URI="mongodb+srv://..."
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### JWT Token Errors
```bash
# Ensure JWT_SECRET is set
export JWT_SECRET="your-secret-key"
```

## Manual Testing with Postman

Import the Postman collection:
```
Silent_Connect_Complete_API.postman_collection.json
```

Contains:
- All 92+ endpoints
- Pre-configured auth tokens
- Example requests/responses
- Test assertions

## Contributing

When adding new features:
1. Write unit tests for services
2. Add E2E tests for endpoints
3. Update this README
4. Ensure coverage > 80%
5. Run all tests before commit

## Test Reports

Generate HTML coverage report:
```bash
npm run test:cov
open coverage/index.html
```

Generate test report:
```bash
npm test -- --json --outputFile=test-report.json
```

## Contact

For test issues, contact the development team or create an issue on GitHub.
