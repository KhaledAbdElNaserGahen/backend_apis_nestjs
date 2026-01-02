import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorProfilesService } from './doctor-profiles.service';
import { DoctorProfilesController } from './doctor-profiles.controller';
import { DoctorProfile } from './entities/doctor-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorProfile])],
  controllers: [DoctorProfilesController],
  providers: [DoctorProfilesService],
  exports: [DoctorProfilesService],
})
export class DoctorProfilesModule {}
