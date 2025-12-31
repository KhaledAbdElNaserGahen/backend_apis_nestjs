import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyMember } from './entities/family-member.entity';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMembersRepository: Repository<FamilyMember>,
  ) {}

  async getFamilyMembers(userId: string | number): Promise<FamilyMember[]> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return await this.familyMembersRepository.find({
      where: { userId: userIdStr } as any,
      order: { created_at: 'DESC' } as any,
    });
  }

  async create(
    createFamilyMemberDto: CreateFamilyMemberDto,
    userId: string | number,
  ): Promise<FamilyMember> {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    const familyMember = this.familyMembersRepository.create({
      ...createFamilyMemberDto,
      userId: userIdStr,
    });

    return await this.familyMembersRepository.save(familyMember);
  }

  async update(
    id: string | number,
    updateFamilyMemberDto: UpdateFamilyMemberDto,
    userId: string | number,
  ): Promise<FamilyMember> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const familyMember = await this.familyMembersRepository.findOne({
      where: { id: idStr, userId: userIdStr } as any,
    });

    if (!familyMember) {
      throw new NotFoundException('Family member not found or you do not have permission');
    }

    Object.assign(familyMember, updateFamilyMemberDto);
    return await this.familyMembersRepository.save(familyMember);
  }

  async remove(id: string | number, userId: string | number): Promise<void> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const familyMember = await this.familyMembersRepository.findOne({
      where: { id: idStr, userId: userIdStr } as any,
    });

    if (!familyMember) {
      throw new NotFoundException('Family member not found or you do not have permission');
    }

    await this.familyMembersRepository.remove(familyMember);
  }

  async findOne(id: string | number, userId: string | number): Promise<FamilyMember> {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    
    const familyMember = await this.familyMembersRepository.findOne({
      where: { id: idStr, userId: userIdStr } as any,
    });

    if (!familyMember) {
      throw new NotFoundException('Family member not found');
    }

    return familyMember;
  }
}
