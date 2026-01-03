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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    getHealth() {
        return {
            status: 'ok',
            message: 'Silent Connect API is running',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            endpoints: {
                docs: 'Use /api/v1 prefix for all endpoints',
                auth: '/api/v1/auth',
                users: '/api/v1/users',
                clinics: '/api/v1/clinics',
                pharmacy: '/api/v1/pharmacy',
                videos: '/api/v1/videos',
                messages: '/api/v1/messages',
                emergency: '/api/v1/emergency',
                settings: '/api/v1/settings',
                notifications: '/api/v1/notifications',
                family: '/api/v1/family',
                admin: '/api/v1/admin',
            },
        };
    }
    healthCheck() {
        return {
            status: 'healthy',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map