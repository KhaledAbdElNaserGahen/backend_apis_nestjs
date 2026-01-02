import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-status.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, patientId: string): Promise<Appointment> {
    // Validate date is not in the past
    const appointmentDateTime = new Date(`${createAppointmentDto.appointmentDate} ${createAppointmentDto.appointmentTime}`);
    if (appointmentDateTime < new Date()) {
      throw new BadRequestException('Cannot book appointment in the past');
    }

    // Check if time slot is available
    const existingAppointment = await this.appointmentsRepository.findOne({
      where: {
        doctorId: createAppointmentDto.doctorId,
        appointmentDate: createAppointmentDto.appointmentDate,
        appointmentTime: createAppointmentDto.appointmentTime,
        status: { $in: ['pending', 'confirmed'] } as any,
      } as any,
    });

    if (existingAppointment) {
      throw new BadRequestException('This time slot is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      id: new ObjectId().toString(),
      patientId,
      doctorId: createAppointmentDto.doctorId,
      clinicId: createAppointmentDto.clinicId,
      appointmentDate: createAppointmentDto.appointmentDate,
      appointmentTime: createAppointmentDto.appointmentTime,
      reason: createAppointmentDto.reason,
      isFirstVisit: createAppointmentDto.isFirstVisit || false,
      patientNotes: createAppointmentDto.patientNotes,
      duration: createAppointmentDto.duration || 30,
      status: 'pending',
    });

    return await this.appointmentsRepository.save(appointment);
  }

  async findAll(userId: string, role: string): Promise<Appointment[]> {
    const where: any = {};

    if (role === 'patient') {
      where.patientId = userId;
    } else if (role === 'doctor') {
      where.doctorId = userId;
    } else if (role !== 'superadmin' && role !== 'admin') {
      throw new BadRequestException('Invalid role for viewing appointments');
    }

    return await this.appointmentsRepository.find({
      where: where as any,
      order: { appointmentDate: 'DESC', appointmentTime: 'DESC' } as any,
    });
  }

  async findOne(id: string, userId: string, role: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id } as any,
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Authorization check
    if (role === 'patient' && appointment.patientId !== userId) {
      throw new BadRequestException('Not authorized to view this appointment');
    }
    if (role === 'doctor' && appointment.doctorId !== userId) {
      throw new BadRequestException('Not authorized to view this appointment');
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto, userId: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id } as any,
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Only patient can update their own appointment
    if (appointment.patientId !== userId) {
      throw new BadRequestException('Not authorized to update this appointment');
    }

    // Can't update if already confirmed or completed
    if (appointment.status === 'completed') {
      throw new BadRequestException('Cannot update completed appointment');
    }

    if (updateAppointmentDto.appointmentDate) {
      appointment.appointmentDate = updateAppointmentDto.appointmentDate;
    }
    if (updateAppointmentDto.appointmentTime) {
      appointment.appointmentTime = updateAppointmentDto.appointmentTime;
    }
    if (updateAppointmentDto.reason !== undefined) {
      appointment.reason = updateAppointmentDto.reason;
    }
    if (updateAppointmentDto.patientNotes !== undefined) {
      appointment.patientNotes = updateAppointmentDto.patientNotes;
    }
    if (updateAppointmentDto.duration !== undefined) {
      appointment.duration = updateAppointmentDto.duration;
    }

    // Reset to pending if rescheduled
    if (appointment.status === 'confirmed' && (updateAppointmentDto.appointmentDate || updateAppointmentDto.appointmentTime)) {
      appointment.status = 'pending';
    }

    return await this.appointmentsRepository.save(appointment);
  }

  async updateStatus(id: string, updateStatusDto: UpdateAppointmentStatusDto, userId: string, role: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id } as any,
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Doctor can confirm/complete, patient can cancel, admin can do all
    if (role === 'doctor' && appointment.doctorId !== userId) {
      throw new BadRequestException('Not authorized to update this appointment');
    }
    if (role === 'patient' && appointment.patientId !== userId && updateStatusDto.status !== 'cancelled') {
      throw new BadRequestException('Patients can only cancel their own appointments');
    }

    appointment.status = updateStatusDto.status;
    
    if (updateStatusDto.doctorNotes) {
      appointment.doctorNotes = updateStatusDto.doctorNotes;
    }
    if (updateStatusDto.cancelReason) {
      appointment.cancelReason = updateStatusDto.cancelReason;
    }

    return await this.appointmentsRepository.save(appointment);
  }

  async remove(id: string, userId: string): Promise<void> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id } as any,
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Only patient can delete and only if pending
    if (appointment.patientId !== userId) {
      throw new BadRequestException('Not authorized to delete this appointment');
    }

    if (appointment.status !== 'pending') {
      throw new BadRequestException('Can only delete pending appointments');
    }

    await this.appointmentsRepository.remove(appointment);
  }

  async getAvailableSlots(doctorId: string, date: string): Promise<string[]> {
    // Get all booked appointments for this doctor on this date
    const bookedAppointments = await this.appointmentsRepository.find({
      where: {
        doctorId,
        appointmentDate: date,
        status: { $in: ['pending', 'confirmed'] } as any,
      } as any,
    });

    const bookedTimes = bookedAppointments.map(apt => apt.appointmentTime);

    // Generate available slots (9:00 AM to 5:00 PM, 30-min intervals)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      allSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    return availableSlots;
  }

  async getDoctorAppointments(doctorId: string, date?: string): Promise<Appointment[]> {
    const where: any = { doctorId };
    
    if (date) {
      where.appointmentDate = date;
    }

    return await this.appointmentsRepository.find({
      where: where as any,
      order: { appointmentDate: 'ASC', appointmentTime: 'ASC' } as any,
    });
  }
}
