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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const clinic_entity_1 = require("../clinics/entities/clinic.entity");
let AdminService = class AdminService {
    constructor(usersRepository, clinicsRepository) {
        this.usersRepository = usersRepository;
        this.clinicsRepository = clinicsRepository;
    }
    async getUsers(filters) {
        const where = {};
        if (filters?.role) {
            where.role = filters.role;
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return await this.usersRepository.find({
            where: where,
            order: { created_at: 'DESC' },
        });
    }
    async updateUserRole(updateUserRoleDto) {
        const userIdStr = typeof updateUserRoleDto.userId === 'number'
            ? updateUserRoleDto.userId.toString()
            : updateUserRoleDto.userId;
        const user = await this.usersRepository.findOne({
            where: { id: userIdStr },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.role = updateUserRoleDto.role;
        return await this.usersRepository.save(user);
    }
    async approveUser(approveUserDto) {
        const userIdStr = typeof approveUserDto.userId === 'number'
            ? approveUserDto.userId.toString()
            : approveUserDto.userId;
        const user = await this.usersRepository.findOne({
            where: { id: userIdStr },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.status = approveUserDto.status;
        return await this.usersRepository.save(user);
    }
    async createClinic(createClinicDto) {
        if (createClinicDto.doctorId) {
            const doctorIdStr = typeof createClinicDto.doctorId === 'number'
                ? createClinicDto.doctorId.toString()
                : createClinicDto.doctorId;
            const doctor = await this.usersRepository.findOne({
                where: { id: doctorIdStr, role: 'doctor' },
            });
            if (!doctor) {
                throw new common_1.BadRequestException('Doctor not found or user is not a doctor');
            }
        }
        const doctorIdStr = createClinicDto.doctorId
            ? (typeof createClinicDto.doctorId === 'number'
                ? createClinicDto.doctorId.toString()
                : createClinicDto.doctorId)
            : undefined;
        const clinic = this.clinicsRepository.create({
            name: createClinicDto.name,
            specialty: createClinicDto.specialty,
            doctorId: doctorIdStr,
            location: createClinicDto.location,
            phone: createClinicDto.phone,
            workingHours: createClinicDto.working_hours,
        });
        return await this.clinicsRepository.save(clinic);
    }
    async getStatistics() {
        const totalUsers = await this.usersRepository.count();
        const totalPatients = await this.usersRepository.count({ where: { role: 'patient' } });
        const totalDoctors = await this.usersRepository.count({ where: { role: 'doctor' } });
        const totalClinics = await this.clinicsRepository.count();
        const pendingUsers = await this.usersRepository.count({ where: { status: 'pending' } });
        return {
            totalUsers,
            totalPatients,
            totalDoctors,
            totalClinics,
            pendingUsers,
        };
    }
    async deleteUser(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        const user = await this.usersRepository.findOne({
            where: { id: userIdStr }
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === 'superadmin') {
            throw new common_1.BadRequestException('Cannot delete superadmin user');
        }
        await this.usersRepository.remove(user);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(clinic_entity_1.Clinic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map