import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyService as EmergencyServiceEntity } from './entities/emergency-service.entity';
import { EmergencyRequest } from './entities/emergency-request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Injectable()
export class EmergencyService {
  constructor(
    @InjectRepository(EmergencyServiceEntity)
    private emergencyServicesRepository: Repository<EmergencyServiceEntity>,
    @InjectRepository(EmergencyRequest)
    private emergencyRequestsRepository: Repository<EmergencyRequest>,
  ) {}

  async getServices(): Promise<EmergencyServiceEntity[]> {
    return await this.emergencyServicesRepository.find({
      where: { is_active: true } as any,
      order: { priority: 'DESC', name: 'ASC' } as any,
    });
  }

  async createRequest(
    createRequestDto: CreateRequestDto,
    userId: string | number,
  ): Promise<EmergencyRequest> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const request = this.emergencyRequestsRepository.create({
      ...createRequestDto,
      userId: userIdStr,
      serviceId: typeof createRequestDto.serviceId === 'number' ? createRequestDto.serviceId.toString() : createRequestDto.serviceId,
    });

    return await this.emergencyRequestsRepository.save(request);
  }

  async getMyRequests(userId: string | number): Promise<EmergencyRequest[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return await this.emergencyRequestsRepository.find({
      where: { userId: userIdStr } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async updateRequestStatus(
    requestId: string | number,
    updateStatusDto: UpdateRequestStatusDto,
  ): Promise<EmergencyRequest> {
    const requestIdStr = typeof requestId === 'number' ? requestId.toString() : requestId;
    const request = await this.emergencyRequestsRepository.findOne({
      where: { id: requestIdStr } as any,
    });

    if (!request) {
      throw new NotFoundException('Emergency request not found');
    }

    request.status = updateStatusDto.status;
    if (updateStatusDto.notes) {
      request.notes = updateStatusDto.notes;
    }

    if (updateStatusDto.status === 'completed') {
      request.completed_at = new Date();
    }

    return await this.emergencyRequestsRepository.save(request);
  }

  async getAllRequests(): Promise<EmergencyRequest[]> {
    return await this.emergencyRequestsRepository.find({
      order: { created_at: 'DESC' } as any,
    });
  }
}
