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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_setting_entity_1 = require("./entities/user-setting.entity");
let SettingsService = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async getSettings(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        let settings = await this.settingsRepository.findOne({
            where: { userId: userIdStr },
        });
        if (!settings) {
            settings = this.settingsRepository.create({
                userId: userIdStr,
                language: 'ar',
                notifications_enabled: true,
                sound_enabled: true,
                vibration_enabled: true,
                font_size: 'medium',
                theme: 'light',
                show_online_status: true,
            });
            settings = await this.settingsRepository.save(settings);
        }
        return settings;
    }
    async updateSettings(userId, updateSettingsDto) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        let settings = await this.settingsRepository.findOne({
            where: { userId: userIdStr },
        });
        if (!settings) {
            settings = this.settingsRepository.create({
                userId: userIdStr,
                ...updateSettingsDto,
            });
        }
        else {
            Object.assign(settings, updateSettingsDto);
        }
        return await this.settingsRepository.save(settings);
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_setting_entity_1.UserSetting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map