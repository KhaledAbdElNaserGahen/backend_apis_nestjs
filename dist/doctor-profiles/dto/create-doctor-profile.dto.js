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
exports.CreateDoctorProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TimeSlotDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimeSlotDto.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimeSlotDto.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TimeSlotDto.prototype, "endTime", void 0);
class CredentialDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CredentialDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CredentialDto.prototype, "institution", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CredentialDto.prototype, "year", void 0);
class CreateDoctorProfileDto {
}
exports.CreateDoctorProfileDto = CreateDoctorProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDoctorProfileDto.prototype, "specialty", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDoctorProfileDto.prototype, "subSpecialties", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDoctorProfileDto.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDoctorProfileDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CredentialDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDoctorProfileDto.prototype, "credentials", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDoctorProfileDto.prototype, "languages", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDoctorProfileDto.prototype, "consultationFee", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TimeSlotDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDoctorProfileDto.prototype, "availability", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDoctorProfileDto.prototype, "acceptsNewPatients", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDoctorProfileDto.prototype, "profileImage", void 0);
//# sourceMappingURL=create-doctor-profile.dto.js.map