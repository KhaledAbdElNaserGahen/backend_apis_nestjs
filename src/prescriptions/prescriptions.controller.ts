import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('prescriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @Roles('doctor', 'admin', 'superadmin')
  create(@Body() createPrescriptionDto: CreatePrescriptionDto, @Request() req) {
    return this.prescriptionsService.create(createPrescriptionDto, req.user.userId);
  }

  @Get()
  @Roles('admin', 'superadmin')
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string, @Request() req) {
    // Patients can only view their own prescriptions
    if (req.user.role === 'patient' && req.user.userId !== patientId) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }
    return this.prescriptionsService.findByPatient(patientId);
  }

  @Get('doctor/:doctorId')
  @Roles('doctor', 'admin', 'superadmin')
  findByDoctor(@Param('doctorId') doctorId: string, @Request() req) {
    // Doctors can only view their own prescriptions unless admin
    if (req.user.role === 'doctor' && req.user.userId !== doctorId) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }
    return this.prescriptionsService.findByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }

  @Put(':id')
  @Roles('doctor', 'admin', 'superadmin')
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
    @Request() req,
  ) {
    return this.prescriptionsService.update(id, updatePrescriptionDto, req.user.userId, req.user.role);
  }

  @Put(':id/status')
  @Roles('doctor', 'admin', 'superadmin')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Request() req,
  ) {
    return this.prescriptionsService.updateStatus(id, status, req.user.userId, req.user.role);
  }

  @Delete(':id')
  @Roles('doctor', 'admin', 'superadmin')
  remove(@Param('id') id: string, @Request() req) {
    return this.prescriptionsService.remove(id, req.user.userId, req.user.role);
  }
}
