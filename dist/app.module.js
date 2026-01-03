"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const clinics_module_1 = require("./clinics/clinics.module");
const pharmacy_module_1 = require("./pharmacy/pharmacy.module");
const videos_module_1 = require("./videos/videos.module");
const messages_module_1 = require("./messages/messages.module");
const emergency_module_1 = require("./emergency/emergency.module");
const settings_module_1 = require("./settings/settings.module");
const notifications_module_1 = require("./notifications/notifications.module");
const family_module_1 = require("./family/family.module");
const admin_module_1 = require("./admin/admin.module");
const appointments_module_1 = require("./appointments/appointments.module");
const reviews_module_1 = require("./reviews/reviews.module");
const prescriptions_module_1 = require("./prescriptions/prescriptions.module");
const search_module_1 = require("./search/search.module");
const doctor_profiles_module_1 = require("./doctor-profiles/doctor-profiles.module");
const chat_module_1 = require("./chat/chat.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mongodb',
                url: process.env.MONGODB_URI || 'mongodb://localhost:27017/silent_connect',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: process.env.NODE_ENV !== 'production',
                useUnifiedTopology: true,
                ssl: true,
                tlsAllowInvalidCertificates: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            clinics_module_1.ClinicsModule,
            pharmacy_module_1.PharmacyModule,
            videos_module_1.VideosModule,
            messages_module_1.MessagesModule,
            emergency_module_1.EmergencyModule,
            settings_module_1.SettingsModule,
            notifications_module_1.NotificationsModule,
            family_module_1.FamilyModule,
            admin_module_1.AdminModule,
            appointments_module_1.AppointmentsModule,
            reviews_module_1.ReviewsModule,
            prescriptions_module_1.PrescriptionsModule,
            search_module_1.SearchModule,
            doctor_profiles_module_1.DoctorProfilesModule,
            chat_module_1.ChatModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map