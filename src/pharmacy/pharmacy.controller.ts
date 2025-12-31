import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PharmacyService } from './pharmacy.service';

@Controller('pharmacy')
@UseGuards(JwtAuthGuard)
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

  @Get()
  async getPrescriptions(@Request() req) {
    const prescriptions = await this.pharmacyService.getPrescriptions(req.user.userId);
    return {
      success: true,
      message: { prescriptions },
    };
  }
}
