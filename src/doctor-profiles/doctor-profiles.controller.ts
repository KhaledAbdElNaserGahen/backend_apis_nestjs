import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { DoctorProfilesService } from './doctor-profiles.service';
import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('doctor-profiles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorProfilesController {
  constructor(private readonly doctorProfilesService: DoctorProfilesService) {}

  @Post()
  @Roles('doctor')
  create(@Body() createDoctorProfileDto: CreateDoctorProfileDto, @Request() req) {
    return this.doctorProfilesService.create(createDoctorProfileDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.doctorProfilesService.findAll();
  }

  @Get('search')
  searchBySpecialty(@Query('specialty') specialty: string) {
    return this.doctorProfilesService.findBySpecialty(specialty);
  }

  @Get('doctor/:doctorId')
  findByDoctorId(@Param('doctorId') doctorId: string) {
    return this.doctorProfilesService.findByDoctorId(doctorId);
  }

  @Put('doctor/:doctorId')
  @Roles('doctor', 'admin', 'superadmin')
  update(
    @Param('doctorId') doctorId: string,
    @Body() updateDoctorProfileDto: UpdateDoctorProfileDto,
    @Request() req,
  ) {
    return this.doctorProfilesService.update(doctorId, updateDoctorProfileDto, req.user.userId, req.user.role);
  }

  @Delete('doctor/:doctorId')
  @Roles('admin', 'superadmin')
  remove(@Param('doctorId') doctorId: string, @Request() req) {
    return this.doctorProfilesService.remove(doctorId, req.user.userId, req.user.role);
  }
}
