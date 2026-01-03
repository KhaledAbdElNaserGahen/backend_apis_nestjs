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
exports.Clinic = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let Clinic = class Clinic {
};
exports.Clinic = Clinic;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Clinic.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Clinic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Clinic.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "specialty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_name', nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "doctorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id', nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours', nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'available_slots', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Clinic.prototype, "availableSlots", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'next_available', nullable: true }),
    __metadata("design:type", Date)
], Clinic.prototype, "nextAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Clinic.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Clinic.prototype, "rating", void 0);
exports.Clinic = Clinic = __decorate([
    (0, typeorm_1.Entity)('clinics')
], Clinic);
//# sourceMappingURL=clinic.entity.js.map