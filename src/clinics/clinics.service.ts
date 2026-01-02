import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Clinic[]> {
    return this.clinicsRepository.find();
  }

  findOne(id: string | number): Promise<Clinic> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    return this.clinicsRepository.findOne({ where: { id: idStr } as any });
  }

  async getDoctorsByClinic(clinicId: string | number) {
    const idStr = typeof clinicId === 'number' ? clinicId.toString() : clinicId;
    
    // Get all doctors
    const doctors = await this.usersRepository.find({
      where: { role: 'doctor' } as any,
    });

    // Filter doctors that work at this clinic (based on clinics that have this doctor)
    const clinicDoctors = await this.clinicsRepository.find({
      where: { id: idStr } as any,
    });

    // Get unique doctor IDs from clinics
    const doctorIds = clinicDoctors
      .map(clinic => clinic.doctorId)
      .filter(id => id);

    // Filter and return doctor details
    const filteredDoctors = doctors.filter(doctor => 
      doctorIds.includes(doctor.id)
    );

    return filteredDoctors.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.job,
      phone: doctor.phone,
      email: doctor.email,
      gender: doctor.gender,
    }));
  }
}
