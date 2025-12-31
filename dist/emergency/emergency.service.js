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
exports.EmergencyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const emergency_service_entity_1 = require("./entities/emergency-service.entity");
const emergency_request_entity_1 = require("./entities/emergency-request.entity");
let EmergencyService = class EmergencyService {
    constructor(emergencyServicesRepository, emergencyRequestsRepository) {
        this.emergencyServicesRepository = emergencyServicesRepository;
        this.emergencyRequestsRepository = emergencyRequestsRepository;
    }
    async getServices() {
        return await this.emergencyServicesRepository.find({
            where: { is_active: true },
            order: { priority: 'DESC', name: 'ASC' },
        });
    }
    async createRequest(createRequestDto, userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const request = this.emergencyRequestsRepository.create({
            ...createRequestDto,
            userId: userIdStr,
            serviceId: typeof createRequestDto.serviceId === 'number' ? createRequestDto.serviceId.toString() : createRequestDto.serviceId,
        });
        return await this.emergencyRequestsRepository.save(request);
    }
    async getMyRequests(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        return await this.emergencyRequestsRepository.find({
            where: { userId: userIdStr },
            order: { created_at: 'DESC' },
        });
    }
    async updateRequestStatus(requestId, updateStatusDto) {
        const requestIdStr = typeof requestId === 'number' ? requestId.toString() : requestId;
        const request = await this.emergencyRequestsRepository.findOne({
            where: { id: requestIdStr },
        });
        if (!request) {
            throw new common_1.NotFoundException('Emergency request not found');
        }
        request.status = updateStatusDto.status;
        if (updateStatusDto.notes) {
            request.notes = updateStatusDto.notes;
        }
        if (updateStatusDto.status === 'completed') {
            request.completed_at = new Date();
        }
        return await this.emergencyRequestsRepository.save(request);
    }
    async getAllRequests() {
        return await this.emergencyRequestsRepository.find({
            order: { created_at: 'DESC' },
        });
    }
};
exports.EmergencyService = EmergencyService;
exports.EmergencyService = EmergencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(emergency_service_entity_1.EmergencyService)),
    __param(1, (0, typeorm_1.InjectRepository)(emergency_request_entity_1.EmergencyRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmergencyService);
//# sourceMappingURL=emergency.service.js.map