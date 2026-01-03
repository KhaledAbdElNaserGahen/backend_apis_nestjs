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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const admin_service_1 = require("./admin.service");
const update_user_role_dto_1 = require("./dto/update-user-role.dto");
const approve_user_dto_1 = require("./dto/approve-user.dto");
const create_clinic_dto_1 = require("./dto/create-clinic.dto");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const permissions_1 = require("./constants/permissions");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getUsers(filters) {
        const users = await this.adminService.getUsers(filters);
        return {
            success: true,
            data: { users },
        };
    }
    async updateUserRole(updateUserRoleDto) {
        const user = await this.adminService.updateUserRole(updateUserRoleDto);
        return {
            success: true,
            data: { user },
            message: 'User role updated successfully',
        };
    }
    async approveUser(approveUserDto) {
        const user = await this.adminService.approveUser(approveUserDto);
        return {
            success: true,
            data: { user },
            message: 'User status updated successfully',
        };
    }
    async createClinic(createClinicDto) {
        const clinic = await this.adminService.createClinic(createClinicDto);
        return {
            success: true,
            data: { clinic },
            message: 'Clinic created successfully',
        };
    }
    async getStatistics() {
        const statistics = await this.adminService.getStatistics();
        return {
            success: true,
            data: { statistics },
        };
    }
    async deleteUser(id) {
        await this.adminService.deleteUser(+id);
        return {
            success: true,
            message: 'User deleted successfully',
        };
    }
    async getPermissions() {
        return {
            success: true,
            data: {
                permissions: permissions_1.PERMISSIONS,
                groups: permissions_1.PERMISSION_GROUPS,
            },
        };
    }
    async createRole(createRoleDto) {
        const role = await this.adminService.createRole(createRoleDto);
        return {
            success: true,
            data: { role },
            message: 'Role created successfully',
        };
    }
    async getRoles() {
        const roles = await this.adminService.getRoles();
        return {
            success: true,
            data: { roles },
        };
    }
    async getRole(id) {
        const role = await this.adminService.getRole(id);
        return {
            success: true,
            data: { role },
        };
    }
    async updateRole(id, updateRoleDto) {
        const role = await this.adminService.updateRole(id, updateRoleDto);
        return {
            success: true,
            data: { role },
            message: 'Role updated successfully',
        };
    }
    async deleteRole(id) {
        await this.adminService.deleteRole(id);
        return {
            success: true,
            message: 'Role deleted successfully',
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Put)('users/role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Post)('users/approve'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_user_dto_1.ApproveUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveUser", null);
__decorate([
    (0, common_1.Post)('clinics'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clinic_dto_1.CreateClinicDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createClinic", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Post)('roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRole", null);
__decorate([
    (0, common_1.Put)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)('roles/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteRole", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('superadmin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map