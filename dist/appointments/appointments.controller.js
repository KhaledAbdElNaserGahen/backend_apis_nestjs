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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
let AppointmentsController = class AppointmentsController {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async create(req, createAppointmentDto) {
        const appointment = await this.appointmentsService.create(createAppointmentDto, req.user.id);
        return {
            success: true,
            data: { appointment },
            message: 'Appointment booked successfully',
        };
    }
    async findAll(req) {
        const appointments = await this.appointmentsService.findAll(req.user.id, req.user.role);
        return {
            success: true,
            data: { appointments },
        };
    }
    async getAvailableSlots(doctorId, date) {
        const slots = await this.appointmentsService.getAvailableSlots(doctorId, date);
        return {
            success: true,
            data: { slots },
        };
    }
    async getDoctorAppointments(doctorId, date) {
        const appointments = await this.appointmentsService.getDoctorAppointments(doctorId, date);
        return {
            success: true,
            data: { appointments },
        };
    }
    async findOne(req, id) {
        const appointment = await this.appointmentsService.findOne(id, req.user.id, req.user.role);
        return {
            success: true,
            data: { appointment },
        };
    }
    async update(req, id, updateAppointmentDto) {
        const appointment = await this.appointmentsService.update(id, updateAppointmentDto, req.user.id);
        return {
            success: true,
            data: { appointment },
            message: 'Appointment updated successfully',
        };
    }
    async updateStatus(req, id, updateStatusDto) {
        const appointment = await this.appointmentsService.updateStatus(id, updateStatusDto, req.user.id, req.user.role);
        return {
            success: true,
            data: { appointment },
            message: 'Appointment status updated successfully',
        };
    }
    async remove(req, id) {
        await this.appointmentsService.remove(id, req.user.id);
        return {
            success: true,
            message: 'Appointment cancelled successfully',
        };
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available-slots'),
    __param(0, (0, common_1.Query)('doctorId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId'),
    __param(0, (0, common_1.Param)('doctorId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getDoctorAppointments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_status_dto_1.UpdateAppointmentStatusDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "remove", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map