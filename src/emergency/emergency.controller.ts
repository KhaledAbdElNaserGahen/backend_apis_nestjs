import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EmergencyService } from './emergency.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Controller('emergency')
@UseGuards(JwtAuthGuard)
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @Get('services')
  async getServices() {
    const services = await this.emergencyService.getServices();
    return {
      success: true,
      data: { services },
    };
  }

  @Post('request')
  async createRequest(@Request() req, @Body() createRequestDto: CreateRequestDto) {
    const request = await this.emergencyService.createRequest(
      createRequestDto,
      req.user.id,
    );
    return {
      success: true,
      data: { request },
      message: 'Emergency request created successfully',
    };
  }

  @Get('my-requests')
  async getMyRequests(@Request() req) {
    const requests = await this.emergencyService.getMyRequests(req.user.id);
    return {
      success: true,
      data: { requests },
    };
  }

  @Put('requests/:id/status')
  async updateRequestStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateRequestStatusDto,
  ) {
    const request = await this.emergencyService.updateRequestStatus(
      +id,
      updateStatusDto,
    );
    return {
      success: true,
      data: { request },
      message: 'Request status updated successfully',
    };
  }

  @Get('requests')
  async getAllRequests() {
    const requests = await this.emergencyService.getAllRequests();
    return {
      success: true,
      data: { requests },
    };
  }
}
