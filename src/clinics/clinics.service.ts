import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
  ) {}

  findAll(): Promise<Clinic[]> {
    return this.clinicsRepository.find();
  }

  findOne(id: string | number): Promise<Clinic> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    return this.clinicsRepository.findOne({ where: { id: idStr } as any });
  }
}
