import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClinicsService } from './clinics.service';

@Controller('clinics')
@UseGuards(JwtAuthGuard)
export class ClinicsController {
  constructor(private clinicsService: ClinicsService) {}

  @Get()
  async findAll() {
    const clinics = await this.clinicsService.findAll();
    return {
      success: true,
      message: { clinics },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const clinic = await this.clinicsService.findOne(id);
    return {
      success: true,
      clinic,
    };
  }

  @Get(':id/doctors')
  async getDoctors(@Param('id') id: number) {
    const doctors = await this.clinicsService.getDoctorsByClinic(id);
    return {
      success: true,
      data: doctors,
    };
  }
}
