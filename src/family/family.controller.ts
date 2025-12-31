import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FamilyService } from './family.service';
import { CreateFamilyMemberDto } from './dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from './dto/update-family-member.dto';

@Controller('family')
@UseGuards(JwtAuthGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  async getFamilyMembers(@Request() req) {
    const members = await this.familyService.getFamilyMembers(req.user.id);
    return {
      success: true,
      data: { members },
    };
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const member = await this.familyService.findOne(+id, req.user.id);
    return {
      success: true,
      data: { member },
    };
  }

  @Post()
  async create(@Request() req, @Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    const member = await this.familyService.create(createFamilyMemberDto, req.user.id);
    return {
      success: true,
      data: { member },
      message: 'Family member added successfully',
    };
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    const member = await this.familyService.update(
      +id,
      updateFamilyMemberDto,
      req.user.id,
    );
    return {
      success: true,
      data: { member },
      message: 'Family member updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.familyService.remove(+id, req.user.id);
    return {
      success: true,
      message: 'Family member deleted successfully',
    };
  }
}
