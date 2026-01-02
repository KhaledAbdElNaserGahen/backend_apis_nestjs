import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-status.dto';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    const appointment = await this.appointmentsService.create(createAppointmentDto, req.user.id);
    return {
      success: true,
      data: { appointment },
      message: 'Appointment booked successfully',
    };
  }

  @Get()
  async findAll(@Request() req) {
    const appointments = await this.appointmentsService.findAll(req.user.id, req.user.role);
    return {
      success: true,
      data: { appointments },
    };
  }

  @Get('available-slots')
  async getAvailableSlots(@Query('doctorId') doctorId: string, @Query('date') date: string) {
    const slots = await this.appointmentsService.getAvailableSlots(doctorId, date);
    return {
      success: true,
      data: { slots },
    };
  }

  @Get('doctor/:doctorId')
  async getDoctorAppointments(@Param('doctorId') doctorId: string, @Query('date') date?: string) {
    const appointments = await this.appointmentsService.getDoctorAppointments(doctorId, date);
    return {
      success: true,
      data: { appointments },
    };
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const appointment = await this.appointmentsService.findOne(id, req.user.id, req.user.role);
    return {
      success: true,
      data: { appointment },
    };
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentsService.update(id, updateAppointmentDto, req.user.id);
    return {
      success: true,
      data: { appointment },
      message: 'Appointment updated successfully',
    };
  }

  @Put(':id/status')
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateAppointmentStatusDto,
  ) {
    const appointment = await this.appointmentsService.updateStatus(
      id,
      updateStatusDto,
      req.user.id,
      req.user.role,
    );
    return {
      success: true,
      data: { appointment },
      message: 'Appointment status updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    await this.appointmentsService.remove(id, req.user.id);
    return {
      success: true,
      message: 'Appointment cancelled successfully',
    };
  }
}
