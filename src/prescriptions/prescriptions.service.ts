import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionsRepository: Repository<Prescription>,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto, doctorId: string) {
    const prescription = this.prescriptionsRepository.create({
      ...createPrescriptionDto,
      id: randomUUID(),
      doctorId,
      validUntil: createPrescriptionDto.validUntil 
        ? new Date(createPrescriptionDto.validUntil)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
    });

    await this.prescriptionsRepository.save(prescription);

    return {
      success: true,
      message: 'Prescription created successfully',
      data: prescription,
    };
  }

  async findAll() {
    const prescriptions = await this.prescriptionsRepository.find();
    return {
      success: true,
      data: prescriptions,
    };
  }

  async findByPatient(patientId: string) {
    const prescriptions = await this.prescriptionsRepository.find({
      where: { patientId } as any,
      order: { createdAt: 'DESC' },
    });

    return {
      success: true,
      data: prescriptions,
    };
  }

  async findByDoctor(doctorId: string) {
    const prescriptions = await this.prescriptionsRepository.find({
      where: { doctorId } as any,
      order: { createdAt: 'DESC' },
    });

    return {
      success: true,
      data: prescriptions,
    };
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionsRepository.findOne({
      where: { id } as any,
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    return {
      success: true,
      data: prescription,
    };
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto, userId: string, userRole: string) {
    const prescription = await this.prescriptionsRepository.findOne({
      where: { id } as any,
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    // Only the prescribing doctor can update
    if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('You can only update your own prescriptions');
    }

    Object.assign(prescription, updatePrescriptionDto);
    await this.prescriptionsRepository.save(prescription);

    return {
      success: true,
      message: 'Prescription updated successfully',
      data: prescription,
    };
  }

  async remove(id: string, userId: string, userRole: string) {
    const prescription = await this.prescriptionsRepository.findOne({
      where: { id } as any,
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    // Only the prescribing doctor can delete
    if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('You can only delete your own prescriptions');
    }

    await this.prescriptionsRepository.delete({ id } as any);

    return {
      success: true,
      message: 'Prescription deleted successfully',
    };
  }

  async updateStatus(id: string, status: string, userId: string, userRole: string) {
    const prescription = await this.prescriptionsRepository.findOne({
      where: { id } as any,
    });

    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }

    // Only doctor or admin can update status
    if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
      throw new ForbiddenException('Unauthorized to update prescription status');
    }

    prescription.status = status;
    await this.prescriptionsRepository.save(prescription);

    return {
      success: true,
      message: `Prescription marked as ${status}`,
      data: prescription,
    };
  }
}
