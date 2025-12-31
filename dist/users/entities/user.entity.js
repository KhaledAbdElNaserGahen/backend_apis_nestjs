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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_id', nullable: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "nationalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'national_id_image', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nationalIdImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hearing_status', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "hearingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'marital_status', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "maritalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sign_language_level', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signLanguageLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "governorate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_card_image', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "serviceCardImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medical_history', type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "medicalHistory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "allergies", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_phone', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "emergencyPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'blood_type', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bloodType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'patient' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map