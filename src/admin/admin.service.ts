import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
  ) {}

  async getUsers(filters?: any): Promise<User[]> {
    const where: any = {};

    if (filters?.role) {
      where.role = filters.role;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return await this.usersRepository.find({
      where: where as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async updateUserRole(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    const userIdStr = typeof updateUserRoleDto.userId === 'number' 
      ? updateUserRoleDto.userId.toString() 
      : updateUserRoleDto.userId;
    
    const user = await this.usersRepository.findOne({
      where: { id: userIdStr } as any,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = updateUserRoleDto.role;
    return await this.usersRepository.save(user);
  }

  async approveUser(approveUserDto: ApproveUserDto): Promise<User> {
    const userIdStr = typeof approveUserDto.userId === 'number' 
      ? approveUserDto.userId.toString() 
      : approveUserDto.userId;
    
    const user = await this.usersRepository.findOne({
      where: { id: userIdStr } as any,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = approveUserDto.status;
    return await this.usersRepository.save(user);
  }

  async createClinic(createClinicDto: CreateClinicDto): Promise<Clinic> {
    // Verify doctor exists if doctorId provided
    if (createClinicDto.doctorId) {
      const doctorIdStr = typeof createClinicDto.doctorId === 'number' 
        ? createClinicDto.doctorId.toString() 
        : createClinicDto.doctorId;
      
      const doctor = await this.usersRepository.findOne({
        where: { id: doctorIdStr, role: 'doctor' } as any,
      });

      if (!doctor) {
        throw new BadRequestException('Doctor not found or user is not a doctor');
      }
    }

    const doctorIdStr = createClinicDto.doctorId 
      ? (typeof createClinicDto.doctorId === 'number' 
        ? createClinicDto.doctorId.toString() 
        : createClinicDto.doctorId)
      : undefined;

    const clinic = this.clinicsRepository.create({
      name: createClinicDto.name,
      specialty: createClinicDto.specialty,
      doctorId: doctorIdStr,
      location: createClinicDto.location,
      phone: createClinicDto.phone,
      workingHours: createClinicDto.working_hours,
    });

    return await this.clinicsRepository.save(clinic);
  }

  async getStatistics(): Promise<any> {
    const totalUsers = await this.usersRepository.count();
    const totalPatients = await this.usersRepository.count({ where: { role: 'patient' } as any });
    const totalDoctors = await this.usersRepository.count({ where: { role: 'doctor' } as any });
    const totalClinics = await this.clinicsRepository.count();
    const pendingUsers = await this.usersRepository.count({ where: { status: 'pending' } as any });

    return {
      totalUsers,
      totalPatients,
      totalDoctors,
      totalClinics,
      pendingUsers,
    };
  }

  async deleteUser(userId: string | number): Promise<void> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const user = await this.usersRepository.findOne({ 
      where: { id: userIdStr } as any 
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'superadmin') {
      throw new BadRequestException('Cannot delete superadmin user');
    }

    await this.usersRepository.remove(user);
  }
}
