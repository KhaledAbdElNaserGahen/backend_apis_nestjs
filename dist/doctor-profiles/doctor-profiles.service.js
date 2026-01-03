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
exports.DoctorProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_profile_entity_1 = require("./entities/doctor-profile.entity");
const uuid_1 = require("uuid");
let DoctorProfilesService = class DoctorProfilesService {
    constructor(doctorProfilesRepository) {
        this.doctorProfilesRepository = doctorProfilesRepository;
    }
    async create(createDoctorProfileDto, doctorId) {
        const existing = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (existing) {
            throw new common_1.ForbiddenException('Doctor profile already exists');
        }
        const profile = this.doctorProfilesRepository.create({
            ...createDoctorProfileDto,
            id: (0, uuid_1.v4)(),
            doctorId,
        });
        await this.doctorProfilesRepository.save(profile);
        return {
            success: true,
            message: 'Doctor profile created successfully',
            data: profile,
        };
    }
    async findAll() {
        const profiles = await this.doctorProfilesRepository.find();
        return {
            success: true,
            data: profiles,
        };
    }
    async findByDoctorId(doctorId) {
        const profile = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        return {
            success: true,
            data: profile,
        };
    }
    async findBySpecialty(specialty) {
        const profiles = await this.doctorProfilesRepository.find();
        const filtered = profiles.filter(profile => profile.specialty?.toLowerCase().includes(specialty.toLowerCase()));
        return {
            success: true,
            data: filtered,
        };
    }
    async update(doctorId, updateDoctorProfileDto, userId, userRole) {
        const profile = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        if (doctorId !== userId && userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('You can only update your own profile');
        }
        Object.assign(profile, updateDoctorProfileDto);
        await this.doctorProfilesRepository.save(profile);
        return {
            success: true,
            message: 'Doctor profile updated successfully',
            data: profile,
        };
    }
    async updateRating(doctorId, newRating) {
        const profile = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (!profile) {
            const newProfile = this.doctorProfilesRepository.create({
                id: (0, uuid_1.v4)(),
                doctorId,
                specialty: 'General',
                averageRating: newRating,
                totalReviews: 1,
            });
            await this.doctorProfilesRepository.save(newProfile);
            return;
        }
        const totalRating = profile.averageRating * profile.totalReviews + newRating;
        profile.totalReviews += 1;
        profile.averageRating = totalRating / profile.totalReviews;
        await this.doctorProfilesRepository.save(profile);
    }
    async incrementConsultations(doctorId) {
        const profile = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (profile) {
            profile.totalConsultations += 1;
            await this.doctorProfilesRepository.save(profile);
        }
    }
    async remove(doctorId, userId, userRole) {
        const profile = await this.doctorProfilesRepository.findOne({
            where: { doctorId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        if (userRole !== 'admin' && userRole !== 'superadmin') {
            throw new common_1.ForbiddenException('Only administrators can delete doctor profiles');
        }
        await this.doctorProfilesRepository.delete({ doctorId });
        return {
            success: true,
            message: 'Doctor profile deleted successfully',
        };
    }
};
exports.DoctorProfilesService = DoctorProfilesService;
exports.DoctorProfilesService = DoctorProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_profile_entity_1.DoctorProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorProfilesService);
//# sourceMappingURL=doctor-profiles.service.js.map