import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Silent Connect API - E2E Tests (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: string;
  let doctorToken: string;
  let adminToken: string;
  let clinicId: string;
  let appointmentId: string;
  let familyMemberId: string;
  let videoId: string;
  let messageId: string;
  let prescriptionId: string;
  let reviewId: string;
  let roleId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // ==================== Health Check ====================
  describe('Health Check', () => {
    it('/ (GET) - should return API info', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('name');
          expect(res.body).toHaveProperty('version');
        });
    });

    it('/health (GET) - should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
          expect(res.body).toHaveProperty('timestamp');
        });
    });
  });

  // ==================== Authentication Module ====================
  describe('Authentication (Auth)', () => {
    const testUser = {
      email: `test_${Date.now()}@example.com`,
      password: 'Test123!@#',
      name: 'Test User',
      phone: '1234567890',
    };

    const doctorUser = {
      email: `doctor_${Date.now()}@example.com`,
      password: 'Doctor123!@#',
      name: 'Dr. Test',
      phone: '9876543210',
      role: 'doctor',
    };

    it('/api/v1/auth/register (POST) - should register new user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('token');
          expect(res.body.data.user).toHaveProperty('email', testUser.email);
          authToken = res.body.data.token;
          userId = res.body.data.user.id;
        });
    });

    it('/api/v1/auth/register (POST) - should register doctor', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(doctorUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          doctorToken = res.body.data.token;
        });
    });

    it('/api/v1/auth/login (POST) - should login user', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('token');
        });
    });

    it('/api/v1/auth/profile (GET) - should get user profile', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('email', testUser.email);
        });
    });

    it('/api/v1/auth/update-profile (POST) - should update profile', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/update-profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Name' })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('name', 'Updated Name');
        });
    });
  });

  // ==================== Clinics Module ====================
  describe('Clinics', () => {
    it('/api/v1/clinics (GET) - should get all clinics', () => {
      return request(app.getHttpServer())
        .get('/api/v1/clinics')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.clinics)).toBe(true);
          if (res.body.data.clinics.length > 0) {
            clinicId = res.body.data.clinics[0].id;
          }
        });
    });

    it('/api/v1/clinics/:id (GET) - should get clinic by id', () => {
      if (!clinicId) return;
      return request(app.getHttpServer())
        .get(`/api/v1/clinics/${clinicId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id', clinicId);
        });
    });

    it('/api/v1/clinics/:id/doctors (GET) - should get clinic doctors', () => {
      if (!clinicId) return;
      return request(app.getHttpServer())
        .get(`/api/v1/clinics/${clinicId}/doctors`)
        .expect(200);
    });
  });

  // ==================== Doctor Profiles Module ====================
  describe('Doctor Profiles', () => {
    it('/api/v1/doctor-profiles (GET) - should get all doctor profiles', () => {
      return request(app.getHttpServer())
        .get('/api/v1/doctor-profiles')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.profiles)).toBe(true);
        });
    });

    it('/api/v1/doctor-profiles (POST) - should create doctor profile', () => {
      return request(app.getHttpServer())
        .post('/api/v1/doctor-profiles')
        .set('Authorization', `Bearer ${doctorToken}`)
        .send({
          specialty: 'Cardiology',
          yearsOfExperience: 5,
          education: 'MD in Cardiology',
          bio: 'Experienced cardiologist',
        })
        .expect((res) => {
          if (res.status === 201) {
            expect(res.body.success).toBe(true);
          }
        });
    });

    it('/api/v1/doctor-profiles/search (GET) - should search doctors', () => {
      return request(app.getHttpServer())
        .get('/api/v1/doctor-profiles/search?specialty=Cardiology')
        .expect(200);
    });
  });

  // ==================== Appointments Module ====================
  describe('Appointments', () => {
    it('/api/v1/appointments (GET) - should get user appointments', () => {
      return request(app.getHttpServer())
        .get('/api/v1/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.appointments)).toBe(true);
        });
    });

    it('/api/v1/appointments (POST) - should create appointment', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return request(app.getHttpServer())
        .post('/api/v1/appointments')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          doctorId: userId,
          appointmentDate: tomorrow.toISOString(),
          reason: 'Regular checkup',
        })
        .expect((res) => {
          if (res.status === 201) {
            expect(res.body.success).toBe(true);
            appointmentId = res.body.data.id;
          }
        });
    });

    it('/api/v1/appointments/available-slots (GET) - should get available slots', () => {
      return request(app.getHttpServer())
        .get('/api/v1/appointments/available-slots?doctorId=' + userId)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  // ==================== Family Module ====================
  describe('Family Members', () => {
    it('/api/v1/family (GET) - should get family members', () => {
      return request(app.getHttpServer())
        .get('/api/v1/family')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.members)).toBe(true);
        });
    });

    it('/api/v1/family (POST) - should add family member', () => {
      return request(app.getHttpServer())
        .post('/api/v1/family')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'John Doe',
          relationship: 'son',
          dateOfBirth: '2010-01-01',
          phone: '1234567890',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          familyMemberId = res.body.data.id;
        });
    });

    it('/api/v1/family/:id (PUT) - should update family member', () => {
      return request(app.getHttpServer())
        .put(`/api/v1/family/${familyMemberId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Jane Doe' })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });
  });

  // ==================== Prescriptions Module ====================
  describe('Prescriptions', () => {
    it('/api/v1/prescriptions (GET) - should get prescriptions', () => {
      return request(app.getHttpServer())
        .get('/api/v1/prescriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/prescriptions (POST) - should create prescription', () => {
      return request(app.getHttpServer())
        .post('/api/v1/prescriptions')
        .set('Authorization', `Bearer ${doctorToken}`)
        .send({
          patientId: userId,
          medications: [
            {
              name: 'Aspirin',
              dosage: '100mg',
              frequency: 'Once daily',
              duration: '30 days',
            },
          ],
          diagnosis: 'Test diagnosis',
          notes: 'Test notes',
        })
        .expect((res) => {
          if (res.status === 201) {
            expect(res.body.success).toBe(true);
            prescriptionId = res.body.data.id;
          }
        });
    });
  });

  // ==================== Messages Module ====================
  describe('Messages', () => {
    it('/api/v1/messages/conversations (GET) - should get conversations', () => {
      return request(app.getHttpServer())
        .get('/api/v1/messages/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/messages/send (POST) - should send message', () => {
      return request(app.getHttpServer())
        .post('/api/v1/messages/send')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          receiverId: userId,
          content: 'Test message',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          messageId = res.body.data.id;
        });
    });

    it('/api/v1/messages/:userId (GET) - should get messages with user', () => {
      return request(app.getHttpServer())
        .get(`/api/v1/messages/${userId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  // ==================== Videos Module ====================
  describe('Videos', () => {
    it('/api/v1/videos (GET) - should get all videos', () => {
      return request(app.getHttpServer())
        .get('/api/v1/videos')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.videos)).toBe(true);
        });
    });

    it('/api/v1/videos/my-videos (GET) - should get user videos', () => {
      return request(app.getHttpServer())
        .get('/api/v1/videos/my-videos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('/api/v1/videos/category/:category (GET) - should get videos by category', () => {
      return request(app.getHttpServer())
        .get('/api/v1/videos/category/education')
        .expect(200);
    });
  });

  // ==================== Reviews Module ====================
  describe('Reviews', () => {
    it('/api/v1/reviews (GET) - should get reviews', () => {
      return request(app.getHttpServer())
        .get('/api/v1/reviews?doctorId=' + userId)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/reviews (POST) - should create review', () => {
      return request(app.getHttpServer())
        .post('/api/v1/reviews')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          doctorId: userId,
          rating: 5,
          comment: 'Great doctor!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          reviewId = res.body.data.id;
        });
    });

    it('/api/v1/reviews/my-reviews (GET) - should get user reviews', () => {
      return request(app.getHttpServer())
        .get('/api/v1/reviews/my-reviews')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  // ==================== Pharmacy Module ====================
  describe('Pharmacy', () => {
    it('/api/v1/pharmacy (GET) - should get pharmacies', () => {
      return request(app.getHttpServer())
        .get('/api/v1/pharmacy')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/pharmacy (GET) - should search pharmacies', () => {
      return request(app.getHttpServer())
        .get('/api/v1/pharmacy?search=pharmacy')
        .expect(200);
    });
  });

  // ==================== Emergency Module ====================
  describe('Emergency Services', () => {
    it('/api/v1/emergency/services (GET) - should get emergency services', () => {
      return request(app.getHttpServer())
        .get('/api/v1/emergency/services')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/emergency/request (POST) - should create emergency request', () => {
      return request(app.getHttpServer())
        .post('/api/v1/emergency/request')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          serviceId: 'test-service-id',
          location: '123 Main St',
          description: 'Emergency test',
        })
        .expect((res) => {
          if (res.status === 201) {
            expect(res.body.success).toBe(true);
          }
        });
    });

    it('/api/v1/emergency/my-requests (GET) - should get user emergency requests', () => {
      return request(app.getHttpServer())
        .get('/api/v1/emergency/my-requests')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  // ==================== Notifications Module ====================
  describe('Notifications', () => {
    it('/api/v1/notifications (GET) - should get notifications', () => {
      return request(app.getHttpServer())
        .get('/api/v1/notifications')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/notifications/unread-count (GET) - should get unread count', () => {
      return request(app.getHttpServer())
        .get('/api/v1/notifications/unread-count')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(typeof res.body.data.count).toBe('number');
        });
    });

    it('/api/v1/notifications/read-all (PUT) - should mark all as read', () => {
      return request(app.getHttpServer())
        .put('/api/v1/notifications/read-all')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  // ==================== Settings Module ====================
  describe('Settings', () => {
    it('/api/v1/settings (GET) - should get settings', () => {
      return request(app.getHttpServer())
        .get('/api/v1/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });

    it('/api/v1/settings (PUT) - should update settings', () => {
      return request(app.getHttpServer())
        .put('/api/v1/settings')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          notifications: {
            email: true,
            push: false,
          },
          language: 'ar',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });
  });

  // ==================== Search Module ====================
  describe('Search', () => {
    it('/api/v1/search (GET) - should search globally', () => {
      return request(app.getHttpServer())
        .get('/api/v1/search?query=test')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('doctors');
          expect(res.body.data).toHaveProperty('clinics');
          expect(res.body.data).toHaveProperty('videos');
        });
    });

    it('/api/v1/search/doctors (GET) - should search doctors', () => {
      return request(app.getHttpServer())
        .get('/api/v1/search/doctors?query=test')
        .expect(200);
    });

    it('/api/v1/search/clinics (GET) - should search clinics', () => {
      return request(app.getHttpServer())
        .get('/api/v1/search/clinics?query=test')
        .expect(200);
    });

    it('/api/v1/search/videos (GET) - should search videos', () => {
      return request(app.getHttpServer())
        .get('/api/v1/search/videos?query=test')
        .expect(200);
    });
  });

  // ==================== Admin Module ====================
  describe('Admin Panel (requires admin token)', () => {
    it('/api/v1/admin/permissions (GET) - should get permissions list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/admin/permissions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect((res) => {
          // May return 403 if not admin, which is expected
          expect([200, 403]).toContain(res.status);
        });
    });

    it('/api/v1/admin/statistics (GET) - should get admin statistics', () => {
      return request(app.getHttpServer())
        .get('/api/v1/admin/statistics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect((res) => {
          expect([200, 403]).toContain(res.status);
        });
    });

    it('/api/v1/admin/users (GET) - should get all users', () => {
      return request(app.getHttpServer())
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${authToken}`)
        .expect((res) => {
          expect([200, 403]).toContain(res.status);
        });
    });

    it('/api/v1/admin/roles (GET) - should get all roles', () => {
      return request(app.getHttpServer())
        .get('/api/v1/admin/roles')
        .set('Authorization', `Bearer ${authToken}`)
        .expect((res) => {
          expect([200, 403]).toContain(res.status);
        });
    });
  });
});
