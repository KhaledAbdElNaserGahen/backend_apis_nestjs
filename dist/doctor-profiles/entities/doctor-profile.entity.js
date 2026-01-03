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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorProfile = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let DoctorProfile = class DoctorProfile {
};
exports.DoctorProfile = DoctorProfile;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], DoctorProfile.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id', unique: true }),
    __metadata("design:type", String)
], DoctorProfile.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DoctorProfile.prototype, "specialty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_specialties', type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DoctorProfile.prototype, "subSpecialties", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'years_of_experience', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DoctorProfile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DoctorProfile.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DoctorProfile.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'consultation_fee', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "consultationFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], DoctorProfile.prototype, "availability", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'average_rating', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "averageRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_reviews', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "totalReviews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_consultations', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], DoctorProfile.prototype, "totalConsultations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accepts_new_patients', default: true }),
    __metadata("design:type", Boolean)
], DoctorProfile.prototype, "acceptsNewPatients", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_image', nullable: true }),
    __metadata("design:type", String)
], DoctorProfile.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified', default: false }),
    __metadata("design:type", Boolean)
], DoctorProfile.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DoctorProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DoctorProfile.prototype, "updatedAt", void 0);
exports.DoctorProfile = DoctorProfile = __decorate([
    (0, typeorm_1.Entity)('doctor_profiles')
], DoctorProfile);
//# sourceMappingURL=doctor-profile.entity.js.map