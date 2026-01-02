import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { Role } from './entities/role.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
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

  // ==================== Role Management ====================
  
  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if role with same name already exists
    const existingRole = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name } as any,
    });

    if (existingRole) {
      throw new ConflictException('Role with this name already exists');
    }

    const role = this.rolesRepository.create({
      id: new ObjectId().toString(),
      name: createRoleDto.name.toLowerCase().replace(/\s+/g, '_'),
      displayName: createRoleDto.displayName,
      description: createRoleDto.description,
      permissions: createRoleDto.permissions,
      isActive: true,
      isSystemRole: false,
    });

    return await this.rolesRepository.save(role);
  }

  async getRoles(): Promise<Role[]> {
    return await this.rolesRepository.find({
      order: { created_at: 'DESC' } as any,
    });
  }

  async getRole(roleId: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId } as any,
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async updateRole(roleId: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.getRole(roleId);

    if (role.isSystemRole) {
      throw new BadRequestException('Cannot modify system role');
    }

    if (updateRoleDto.displayName !== undefined) {
      role.displayName = updateRoleDto.displayName;
    }

    if (updateRoleDto.description !== undefined) {
      role.description = updateRoleDto.description;
    }

    if (updateRoleDto.permissions !== undefined) {
      role.permissions = updateRoleDto.permissions;
    }

    if (updateRoleDto.isActive !== undefined) {
      role.isActive = updateRoleDto.isActive;
    }

    return await this.rolesRepository.save(role);
  }

  async deleteRole(roleId: string): Promise<void> {
    const role = await this.getRole(roleId);

    if (role.isSystemRole) {
      throw new BadRequestException('Cannot delete system role');
    }

    // Check if any users have this role
    const usersWithRole = await this.usersRepository.count({
      where: { role: role.name } as any,
    });

    if (usersWithRole > 0) {
      throw new BadRequestException(
        `Cannot delete role. ${usersWithRole} user(s) still have this role assigned`,
      );
    }

    await this.rolesRepository.remove(role);
  }

  async getRoleByName(roleName: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({
      where: { name: roleName } as any,
    });
  }
}
