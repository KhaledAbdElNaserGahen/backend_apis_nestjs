"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const mongodb_1 = require("mongodb");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    async create(createAppointmentDto, patientId) {
        const appointmentDateTime = new Date(`${createAppointmentDto.appointmentDate} ${createAppointmentDto.appointmentTime}`);
        if (appointmentDateTime < new Date()) {
            throw new common_1.BadRequestException('Cannot book appointment in the past');
        }
        const existingAppointment = await this.appointmentsRepository.findOne({
            where: {
                doctorId: createAppointmentDto.doctorId,
                appointmentDate: createAppointmentDto.appointmentDate,
                appointmentTime: createAppointmentDto.appointmentTime,
                status: { $in: ['pending', 'confirmed'] },
            },
        });
        if (existingAppointment) {
            throw new common_1.BadRequestException('This time slot is already booked');
        }
        const appointment = this.appointmentsRepository.create({
            id: new mongodb_1.ObjectId().toString(),
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
    async findAll(userId, role) {
        const where = {};
        if (role === 'patient') {
            where.patientId = userId;
        }
        else if (role === 'doctor') {
            where.doctorId = userId;
        }
        else if (role !== 'superadmin' && role !== 'admin') {
            throw new common_1.BadRequestException('Invalid role for viewing appointments');
        }
        return await this.appointmentsRepository.find({
            where: where,
            order: { appointmentDate: 'DESC', appointmentTime: 'DESC' },
        });
    }
    async findOne(id, userId, role) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        if (role === 'patient' && appointment.patientId !== userId) {
            throw new common_1.BadRequestException('Not authorized to view this appointment');
        }
        if (role === 'doctor' && appointment.doctorId !== userId) {
            throw new common_1.BadRequestException('Not authorized to view this appointment');
        }
        return appointment;
    }
    async update(id, updateAppointmentDto, userId) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        if (appointment.patientId !== userId) {
            throw new common_1.BadRequestException('Not authorized to update this appointment');
        }
        if (appointment.status === 'completed') {
            throw new common_1.BadRequestException('Cannot update completed appointment');
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
        if (appointment.status === 'confirmed' && (updateAppointmentDto.appointmentDate || updateAppointmentDto.appointmentTime)) {
            appointment.status = 'pending';
        }
        return await this.appointmentsRepository.save(appointment);
    }
    async updateStatus(id, updateStatusDto, userId, role) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        if (role === 'doctor' && appointment.doctorId !== userId) {
            throw new common_1.BadRequestException('Not authorized to update this appointment');
        }
        if (role === 'patient' && appointment.patientId !== userId && updateStatusDto.status !== 'cancelled') {
            throw new common_1.BadRequestException('Patients can only cancel their own appointments');
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
    async remove(id, userId) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Appointment not found');
        }
        if (appointment.patientId !== userId) {
            throw new common_1.BadRequestException('Not authorized to delete this appointment');
        }
        if (appointment.status !== 'pending') {
            throw new common_1.BadRequestException('Can only delete pending appointments');
        }
        await this.appointmentsRepository.remove(appointment);
    }
    async getAvailableSlots(doctorId, date) {
        const bookedAppointments = await this.appointmentsRepository.find({
            where: {
                doctorId,
                appointmentDate: date,
                status: { $in: ['pending', 'confirmed'] },
            },
        });
        const bookedTimes = bookedAppointments.map(apt => apt.appointmentTime);
        const allSlots = [];
        for (let hour = 9; hour < 17; hour++) {
            allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
            allSlots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
        return availableSlots;
    }
    async getDoctorAppointments(doctorId, date) {
        const where = { doctorId };
        if (date) {
            where.appointmentDate = date;
        }
        return await this.appointmentsRepository.find({
            where: where,
            order: { appointmentDate: 'ASC', appointmentTime: 'ASC' },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map