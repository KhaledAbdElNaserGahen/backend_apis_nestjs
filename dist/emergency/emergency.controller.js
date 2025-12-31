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
exports.EmergencyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const emergency_service_1 = require("./emergency.service");
const create_request_dto_1 = require("./dto/create-request.dto");
const update_request_status_dto_1 = require("./dto/update-request-status.dto");
let EmergencyController = class EmergencyController {
    constructor(emergencyService) {
        this.emergencyService = emergencyService;
    }
    async getServices() {
        const services = await this.emergencyService.getServices();
        return {
            success: true,
            data: { services },
        };
    }
    async createRequest(req, createRequestDto) {
        const request = await this.emergencyService.createRequest(createRequestDto, req.user.id);
        return {
            success: true,
            data: { request },
            message: 'Emergency request created successfully',
        };
    }
    async getMyRequests(req) {
        const requests = await this.emergencyService.getMyRequests(req.user.id);
        return {
            success: true,
            data: { requests },
        };
    }
    async updateRequestStatus(id, updateStatusDto) {
        const request = await this.emergencyService.updateRequestStatus(+id, updateStatusDto);
        return {
            success: true,
            data: { request },
            message: 'Request status updated successfully',
        };
    }
    async getAllRequests() {
        const requests = await this.emergencyService.getAllRequests();
        return {
            success: true,
            data: { requests },
        };
    }
};
exports.EmergencyController = EmergencyController;
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "getServices", null);
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('my-requests'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "getMyRequests", null);
__decorate([
    (0, common_1.Put)('requests/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_request_status_dto_1.UpdateRequestStatusDto]),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "updateRequestStatus", null);
__decorate([
    (0, common_1.Get)('requests'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmergencyController.prototype, "getAllRequests", null);
exports.EmergencyController = EmergencyController = __decorate([
    (0, common_1.Controller)('emergency'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [emergency_service_1.EmergencyService])
], EmergencyController);
//# sourceMappingURL=emergency.controller.js.map