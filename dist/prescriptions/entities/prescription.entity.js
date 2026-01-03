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
exports.Prescription = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let Prescription = class Prescription {
};
exports.Prescription = Prescription;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Prescription.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prescription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_id' }),
    __metadata("design:type", String)
], Prescription.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id' }),
    __metadata("design:type", String)
], Prescription.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appointment_id', nullable: true }),
    __metadata("design:type", String)
], Prescription.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prescription.prototype, "diagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], Prescription.prototype, "medications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Prescription.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'valid_until', nullable: true }),
    __metadata("design:type", Date)
], Prescription.prototype, "validUntil", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Prescription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Prescription.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Prescription.prototype, "updatedAt", void 0);
exports.Prescription = Prescription = __decorate([
    (0, typeorm_1.Entity)('prescriptions')
], Prescription);
//# sourceMappingURL=prescription.entity.js.map