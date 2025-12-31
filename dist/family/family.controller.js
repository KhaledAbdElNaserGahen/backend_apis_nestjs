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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const family_service_1 = require("./family.service");
const create_family_member_dto_1 = require("./dto/create-family-member.dto");
const update_family_member_dto_1 = require("./dto/update-family-member.dto");
let FamilyController = class FamilyController {
    constructor(familyService) {
        this.familyService = familyService;
    }
    async getFamilyMembers(req) {
        const members = await this.familyService.getFamilyMembers(req.user.id);
        return {
            success: true,
            data: { members },
        };
    }
    async findOne(req, id) {
        const member = await this.familyService.findOne(+id, req.user.id);
        return {
            success: true,
            data: { member },
        };
    }
    async create(req, createFamilyMemberDto) {
        const member = await this.familyService.create(createFamilyMemberDto, req.user.id);
        return {
            success: true,
            data: { member },
            message: 'Family member added successfully',
        };
    }
    async update(req, id, updateFamilyMemberDto) {
        const member = await this.familyService.update(+id, updateFamilyMemberDto, req.user.id);
        return {
            success: true,
            data: { member },
            message: 'Family member updated successfully',
        };
    }
    async remove(req, id) {
        await this.familyService.remove(+id, req.user.id);
        return {
            success: true,
            message: 'Family member deleted successfully',
        };
    }
};
exports.FamilyController = FamilyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getFamilyMembers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_family_member_dto_1.CreateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_family_member_dto_1.UpdateFamilyMemberDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "remove", null);
exports.FamilyController = FamilyController = __decorate([
    (0, common_1.Controller)('family'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
//# sourceMappingURL=family.controller.js.map