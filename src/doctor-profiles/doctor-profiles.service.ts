import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DoctorProfilesService {
  constructor(
    @InjectRepository(DoctorProfile)
    private doctorProfilesRepository: Repository<DoctorProfile>,
  ) {}

  async create(createDoctorProfileDto: CreateDoctorProfileDto, doctorId: string) {
    // Check if profile already exists
    const existing = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (existing) {
      throw new ForbiddenException('Doctor profile already exists');
    }

    const profile = this.doctorProfilesRepository.create({
      ...createDoctorProfileDto,
      id: uuidv4(),
      doctorId,
    });

    await this.doctorProfilesRepository.save(profile);

    return {
      success: true,
      message: 'Doctor profile created successfully',
      data: profile,
    };
  }

  async findAll() {
    const profiles = await this.doctorProfilesRepository.find();
    return {
      success: true,
      data: profiles,
    };
  }

  async findByDoctorId(doctorId: string) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (!profile) {
      throw new NotFoundException('Doctor profile not found');
    }

    return {
      success: true,
      data: profile,
    };
  }

  async findBySpecialty(specialty: string) {
    const profiles = await this.doctorProfilesRepository.find();
    const filtered = profiles.filter(
      profile => profile.specialty?.toLowerCase().includes(specialty.toLowerCase())
    );

    return {
      success: true,
      data: filtered,
    };
  }

  async update(doctorId: string, updateDoctorProfileDto: UpdateDoctorProfileDto, userId: string, userRole: string) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (!profile) {
      throw new NotFoundException('Doctor profile not found');
    }

    // Only the doctor or admin can update
    if (doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('You can only update your own profile');
    }

    Object.assign(profile, updateDoctorProfileDto);
    await this.doctorProfilesRepository.save(profile);

    return {
      success: true,
      message: 'Doctor profile updated successfully',
      data: profile,
    };
  }

  async updateRating(doctorId: string, newRating: number) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (!profile) {
      // Create profile if doesn't exist
      const newProfile = this.doctorProfilesRepository.create({
        id: uuidv4(),
        doctorId,
        specialty: 'General',
        averageRating: newRating,
        totalReviews: 1,
      });
      await this.doctorProfilesRepository.save(newProfile);
      return;
    }

    // Recalculate average rating
    const totalRating = profile.averageRating * profile.totalReviews + newRating;
    profile.totalReviews += 1;
    profile.averageRating = totalRating / profile.totalReviews;

    await this.doctorProfilesRepository.save(profile);
  }

  async incrementConsultations(doctorId: string) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (profile) {
      profile.totalConsultations += 1;
      await this.doctorProfilesRepository.save(profile);
    }
  }

  async remove(doctorId: string, userId: string, userRole: string) {
    const profile = await this.doctorProfilesRepository.findOne({
      where: { doctorId } as any,
    });

    if (!profile) {
      throw new NotFoundException('Doctor profile not found');
    }

    // Only admin can delete
    if (userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('Only administrators can delete doctor profiles');
    }

    await this.doctorProfilesRepository.delete({ doctorId } as any);

    return {
      success: true,
      message: 'Doctor profile deleted successfully',
    };
  }
}
