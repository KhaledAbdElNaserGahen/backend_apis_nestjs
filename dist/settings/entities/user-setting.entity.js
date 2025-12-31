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
exports.UserSetting = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let UserSetting = class UserSetting {
};
exports.UserSetting = UserSetting;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], UserSetting.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', unique: true }),
    __metadata("design:type", String)
], UserSetting.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['ar', 'en'], default: 'ar' }),
    __metadata("design:type", String)
], UserSetting.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserSetting.prototype, "notifications_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserSetting.prototype, "sound_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserSetting.prototype, "vibration_enabled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['small', 'medium', 'large'], default: 'medium' }),
    __metadata("design:type", String)
], UserSetting.prototype, "font_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['light', 'dark'], default: 'light' }),
    __metadata("design:type", String)
], UserSetting.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserSetting.prototype, "show_online_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserSetting.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserSetting.prototype, "updated_at", void 0);
exports.UserSetting = UserSetting = __decorate([
    (0, typeorm_1.Entity)('user_settings')
], UserSetting);
//# sourceMappingURL=user-setting.entity.js.map