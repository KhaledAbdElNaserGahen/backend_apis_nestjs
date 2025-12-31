import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clinic } from '../src/clinics/entities/clinic.entity';
import { EmergencyService } from '../src/emergency/entities/emergency-service.entity';
import { Repository } from 'typeorm';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Get repositories
  const clinicsRepo = app.get<Repository<Clinic>>(getRepositoryToken(Clinic));
  const emergencyRepo = app.get<Repository<EmergencyService>>(getRepositoryToken(EmergencyService));

  console.log('🌱 Seeding database...');

  // Seed Clinics
  const clinics = [
    {
      name: 'عيادة الصم المركزية',
      address: 'القاهرة، مصر',
      phone: '0123456789',
      specialty: 'عام',
      description: 'مركز طبي متخصص في خدمة الصم وضعاف السمع',
    },
    {
      name: 'مركز الإشارة الطبي',
      address: 'الإسكندرية، مصر',
      phone: '0111222333',
      specialty: 'أنف وأذن وحنجرة',
      description: 'مركز متخصص في علاج مشاكل السمع',
    },
    {
      name: 'عيادة النور للصم',
      address: 'الجيزة، مصر',
      phone: '0122333444',
      specialty: 'طب عام',
      description: 'رعاية صحية شاملة للصم',
    },
  ];

  for (const clinicData of clinics) {
    const exists = await clinicsRepo.findOne({ where: { name: clinicData.name } });
    if (!exists) {
      await clinicsRepo.save(clinicData);
      console.log(`✅ Created clinic: ${clinicData.name}`);
    } else {
      console.log(`⏭️  Clinic already exists: ${clinicData.name}`);
    }
  }

  // Seed Emergency Services
  const emergencyServices = [
    {
      name: 'الإسعاف',
      phone: '123',
      type: 'medical',
      description: 'خدمة الإسعاف الطارئة',
      isAvailable: true,
    },
    {
      name: 'الشرطة',
      phone: '122',
      type: 'police',
      description: 'الشرطة المصرية',
      isAvailable: true,
    },
    {
      name: 'الإطفاء',
      phone: '180',
      type: 'fire',
      description: 'خدمة الإطفاء',
      isAvailable: true,
    },
    {
      name: 'الحماية المدنية',
      phone: '128',
      type: 'civil_defense',
      description: 'الحماية المدنية',
      isAvailable: true,
    },
    {
      name: 'خط نجدة الطفل',
      phone: '16000',
      type: 'child_helpline',
      description: 'خط نجدة الطفل',
      isAvailable: true,
    },
  ];

  for (const serviceData of emergencyServices) {
    const exists = await emergencyRepo.findOne({ where: { name: serviceData.name } });
    if (!exists) {
      await emergencyRepo.save(serviceData);
      console.log(`✅ Created emergency service: ${serviceData.name}`);
    } else {
      console.log(`⏭️  Emergency service already exists: ${serviceData.name}`);
    }
  }

  console.log('');
  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📊 Collections created:');
  console.log('  - clinics');
  console.log('  - emergency_services');
  console.log('  - users (created via registration)');
  console.log('');
  console.log('📝 Other collections will be created when data is added:');
  console.log('  - messages (when users send messages)');
  console.log('  - notifications (when notifications are sent)');
  console.log('  - videos (when videos are uploaded)');
  console.log('  - family_members (when users add family)');
  console.log('  - user_settings (when settings are updated)');
  console.log('  - emergency_requests (when requests are made)');
  console.log('');

  await app.close();
}

seed()
  .then(() => {
    console.log('✅ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
