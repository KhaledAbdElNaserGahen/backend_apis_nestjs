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
exports.PrescriptionsController = void 0;
const common_1 = require("@nestjs/common");
const prescriptions_service_1 = require("./prescriptions.service");
const create_prescription_dto_1 = require("./dto/create-prescription.dto");
const update_prescription_dto_1 = require("./dto/update-prescription.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PrescriptionsController = class PrescriptionsController {
    constructor(prescriptionsService) {
        this.prescriptionsService = prescriptionsService;
    }
    create(createPrescriptionDto, req) {
        return this.prescriptionsService.create(createPrescriptionDto, req.user.userId);
    }
    findAll() {
        return this.prescriptionsService.findAll();
    }
    findByPatient(patientId, req) {
        if (req.user.role === 'patient' && req.user.userId !== patientId) {
            return {
                success: false,
                message: 'Unauthorized access',
            };
        }
        return this.prescriptionsService.findByPatient(patientId);
    }
    findByDoctor(doctorId, req) {
        if (req.user.role === 'doctor' && req.user.userId !== doctorId) {
            return {
                success: false,
                message: 'Unauthorized access',
            };
        }
        return this.prescriptionsService.findByDoctor(doctorId);
    }
    findOne(id) {
        return this.prescriptionsService.findOne(id);
    }
    update(id, updatePrescriptionDto, req) {
        return this.prescriptionsService.update(id, updatePrescriptionDto, req.user.userId, req.user.role);
    }
    updateStatus(id, status, req) {
        return this.prescriptionsService.updateStatus(id, status, req.user.userId, req.user.role);
    }
    remove(id, req) {
        return this.prescriptionsService.remove(id, req.user.userId, req.user.role);
    }
};
exports.PrescriptionsController = PrescriptionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('doctor', 'admin', 'superadmin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prescription_dto_1.CreatePrescriptionDto, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId'),
    (0, roles_decorator_1.Roles)('doctor', 'admin', 'superadmin'),
    __param(0, (0, common_1.Param)('doctorId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findByDoctor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('doctor', 'admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prescription_dto_1.UpdatePrescriptionDto, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, roles_decorator_1.Roles)('doctor', 'admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('doctor', 'admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "remove", null);
exports.PrescriptionsController = PrescriptionsController = __decorate([
    (0, common_1.Controller)('prescriptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [prescriptions_service_1.PrescriptionsService])
], PrescriptionsController);
//# sourceMappingURL=prescriptions.controller.js.map