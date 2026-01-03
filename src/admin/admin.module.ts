import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';































































































import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Clinic, Role])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

