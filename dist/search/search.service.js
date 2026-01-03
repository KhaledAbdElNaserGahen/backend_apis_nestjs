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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const clinic_entity_1 = require("../clinics/entities/clinic.entity");
const video_entity_1 = require("../videos/entities/video.entity");
const pharmacy_entity_1 = require("../pharmacy/entities/pharmacy.entity");
let SearchService = class SearchService {
    constructor(usersRepository, clinicsRepository, videosRepository, pharmaciesRepository) {
        this.usersRepository = usersRepository;
        this.clinicsRepository = clinicsRepository;
        this.videosRepository = videosRepository;
        this.pharmaciesRepository = pharmaciesRepository;
    }
    async globalSearch(query, filters) {
        const searchTerm = query.toLowerCase();
        const results = {
            doctors: [],
            clinics: [],
            videos: [],
            pharmacies: [],
        };
        if (!filters || filters.includes('doctors')) {
            const doctors = await this.usersRepository.find({
                where: { role: 'doctor' },
            });
            results.doctors = doctors.filter(doctor => doctor.name?.toLowerCase().includes(searchTerm) ||
                doctor.job?.toLowerCase().includes(searchTerm)).map(doctor => ({
                id: doctor.id,
                name: doctor.name,
                specialty: doctor.job,
                email: doctor.email,
                phone: doctor.phone,
            }));
        }
        if (!filters || filters.includes('clinics')) {
            const clinics = await this.clinicsRepository.find();
            results.clinics = clinics.filter(clinic => clinic.name?.toLowerCase().includes(searchTerm) ||
                clinic.address?.toLowerCase().includes(searchTerm) ||
                clinic.specialty?.toLowerCase().includes(searchTerm)).map(clinic => ({
                id: clinic.id,
                name: clinic.name,
                address: clinic.address,
                specialty: clinic.specialty,
                phone: clinic.phone,
                rating: clinic.rating,
            }));
        }
        if (!filters || filters.includes('videos')) {
            const videos = await this.videosRepository.find();
            results.videos = videos.filter(video => video.title?.toLowerCase().includes(searchTerm) ||
                video.description?.toLowerCase().includes(searchTerm) ||
                video.category?.toLowerCase().includes(searchTerm)).map(video => ({
                id: video.id,
                title: video.title,
                description: video.description,
                category: video.category,
                thumbnailUrl: video.thumbnailUrl,
                duration: video.duration,
            }));
        }
        if (!filters || filters.includes('pharmacies')) {
            const pharmacies = await this.pharmaciesRepository.find();
            results.pharmacies = pharmacies.filter(pharmacy => pharmacy.name?.toLowerCase().includes(searchTerm) ||
                pharmacy.address?.toLowerCase().includes(searchTerm) ||
                pharmacy.city?.toLowerCase().includes(searchTerm)).map(pharmacy => ({
                id: pharmacy.id,
                name: pharmacy.name,
                address: pharmacy.address,
                city: pharmacy.city,
                phone: pharmacy.phone,
                isOpen: pharmacy.isOpen,
            }));
        }
        const totalResults = results.doctors.length +
            results.clinics.length +
            results.videos.length +
            results.pharmacies.length;
        return {
            success: true,
            query: query,
            totalResults,
            data: results,
        };
    }
    async searchDoctors(query) {
        const searchTerm = query.toLowerCase();
        const doctors = await this.usersRepository.find({
            where: { role: 'doctor' },
        });
        const filtered = doctors.filter(doctor => doctor.name?.toLowerCase().includes(searchTerm) ||
            doctor.job?.toLowerCase().includes(searchTerm));
        return {
            success: true,
            data: filtered.map(doctor => ({
                id: doctor.id,
                name: doctor.name,
                specialty: doctor.job,
                email: doctor.email,
                phone: doctor.phone,
                gender: doctor.gender,
            })),
        };
    }
    async searchClinics(query) {
        const searchTerm = query.toLowerCase();
        const clinics = await this.clinicsRepository.find();
        const filtered = clinics.filter(clinic => clinic.name?.toLowerCase().includes(searchTerm) ||
            clinic.address?.toLowerCase().includes(searchTerm) ||
            clinic.specialty?.toLowerCase().includes(searchTerm));
        return {
            success: true,
            data: filtered,
        };
    }
    async searchVideos(query) {
        const searchTerm = query.toLowerCase();
        const videos = await this.videosRepository.find();
        const filtered = videos.filter(video => video.title?.toLowerCase().includes(searchTerm) ||
            video.description?.toLowerCase().includes(searchTerm) ||
            video.category?.toLowerCase().includes(searchTerm));
        return {
            success: true,
            data: filtered,
        };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(clinic_entity_1.Clinic)),
    __param(2, (0, typeorm_1.InjectRepository)(video_entity_1.Video)),
    __param(3, (0, typeorm_1.InjectRepository)(pharmacy_entity_1.Pharmacy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map