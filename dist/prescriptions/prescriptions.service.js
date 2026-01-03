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
exports.PrescriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const prescription_entity_1 = require("./entities/prescription.entity");
const crypto_1 = require("crypto");
let PrescriptionsService = class PrescriptionsService {
    constructor(prescriptionsRepository) {
        this.prescriptionsRepository = prescriptionsRepository;
    }
    async create(createPrescriptionDto, doctorId) {
        const prescription = this.prescriptionsRepository.create({
            ...createPrescriptionDto,
            id: (0, crypto_1.randomUUID)(),
            doctorId,
            validUntil: createPrescriptionDto.validUntil
                ? new Date(createPrescriptionDto.validUntil)
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        await this.prescriptionsRepository.save(prescription);
        return {
            success: true,
            message: 'Prescription created successfully',
            data: prescription,
        };
    }
    async findAll() {
        const prescriptions = await this.prescriptionsRepository.find();
        return {
            success: true,
            data: prescriptions,
        };
    }
    async findByPatient(patientId) {
        const prescriptions = await this.prescriptionsRepository.find({
            where: { patientId },
            order: { createdAt: 'DESC' },
        });
        return {
            success: true,
            data: prescriptions,
        };
    }
    async findByDoctor(doctorId) {
        const prescriptions = await this.prescriptionsRepository.find({
            where: { doctorId },
            order: { createdAt: 'DESC' },
        });
        return {
            success: true,
            data: prescriptions,
        };
    }
    async findOne(id) {
        const prescription = await this.prescriptionsRepository.findOne({
            where: { id },
        });
        if (!prescription) {
            throw new common_1.NotFoundException('Prescription not found');
        }
        return {
            success: true,
            data: prescription,
        };
    }
    async update(id, updatePrescriptionDto, userId, userRole) {
        const prescription = await this.prescriptionsRepository.findOne({
            where: { id },
        });
        if (!prescription) {
            throw new common_1.NotFoundException('Prescription not found');
        }
        if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('You can only update your own prescriptions');
        }
        Object.assign(prescription, updatePrescriptionDto);
        await this.prescriptionsRepository.save(prescription);
        return {
            success: true,
            message: 'Prescription updated successfully',
            data: prescription,
        };
    }
    async remove(id, userId, userRole) {
        const prescription = await this.prescriptionsRepository.findOne({
            where: { id },
        });
        if (!prescription) {
            throw new common_1.NotFoundException('Prescription not found');
        }
        if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('You can only delete your own prescriptions');
        }
        await this.prescriptionsRepository.delete({ id });
        return {
            success: true,
            message: 'Prescription deleted successfully',
        };
    }
    async updateStatus(id, status, userId, userRole) {
        const prescription = await this.prescriptionsRepository.findOne({
            where: { id },
        });
        if (!prescription) {
            throw new common_1.NotFoundException('Prescription not found');
        }
        if (prescription.doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('Unauthorized to update prescription status');
        }
        prescription.status = status;
        await this.prescriptionsRepository.save(prescription);
        return {
            success: true,
            message: `Prescription marked as ${status}`,
            data: prescription,
        };
    }
};
exports.PrescriptionsService = PrescriptionsService;
exports.PrescriptionsService = PrescriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prescription_entity_1.Prescription)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PrescriptionsService);
//# sourceMappingURL=prescriptions.service.js.map