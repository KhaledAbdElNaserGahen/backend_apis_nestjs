import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClinicsModule } from './clinics/clinics.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { VideosModule } from './videos/videos.module';
import { MessagesModule } from './messages/messages.module';
import { EmergencyModule } from './emergency/emergency.module';
import { SettingsModule } from './settings/settings.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FamilyModule } from './family/family.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/silent_connect',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      ssl: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    }),
    AuthModule,
    UsersModule,
    ClinicsModule,
    PharmacyModule,
    VideosModule,
    MessagesModule,
    EmergencyModule,
    SettingsModule,
    NotificationsModule,
    FamilyModule,
    AdminModule,
  ],
})
export class AppModule {}
