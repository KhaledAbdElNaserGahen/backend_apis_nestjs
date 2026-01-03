"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.resetCodes = new Map();
        this.verificationCodes = new Map();
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
            age: registerDto.age ? parseInt(registerDto.age) : undefined,
        });
        const token = this.generateToken(user);
        return {
            success: true,
            data: { token },
            message: 'تم التسجيل بنجاح',
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('بيانات غير صحيحة');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('بيانات غير صحيحة');
        }
        await this.usersService.update(user.id, { lastLogin: new Date() });
        const token = this.generateToken(user);
        return {
            success: true,
            message: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        };
    }
    generateToken(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }
    async validateUser(userId) {
        const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
        return this.usersService.findOne(userIdStr);
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.usersService.findByEmail(forgotPasswordDto.email);
        if (!user) {
            return {
                success: true,
                message: 'If the email exists, a reset code has been sent',
            };
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 15 * 60 * 1000);
        this.resetCodes.set(forgotPasswordDto.email, { code, expiry });
        console.log(`Password reset code for ${forgotPasswordDto.email}: ${code}`);
        return {
            success: true,
            message: 'Reset code sent to your email',
            dev: { code },
        };
    }
    async resetPassword(resetPasswordDto) {
        const stored = this.resetCodes.get(resetPasswordDto.email);
        if (!stored) {
            throw new common_1.BadRequestException('Invalid or expired reset code');
        }
        if (stored.expiry < new Date()) {
            this.resetCodes.delete(resetPasswordDto.email);
            throw new common_1.BadRequestException('Reset code has expired');
        }
        if (stored.code !== resetPasswordDto.code) {
            throw new common_1.BadRequestException('Invalid reset code');
        }
        const user = await this.usersService.findByEmail(resetPasswordDto.email);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
        await this.usersService.update(user.id, { password: hashedPassword });
        this.resetCodes.delete(resetPasswordDto.email);
        return {
            success: true,
            message: 'Password reset successfully',
        };
    }
    async sendVerificationEmail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 30 * 60 * 1000);
        this.verificationCodes.set(email, { code, expiry });
        console.log(`Verification code for ${email}: ${code}`);
        return {
            success: true,
            message: 'Verification code sent to your email',
            dev: { code },
        };
    }
    async verifyEmail(verifyEmailDto) {
        const stored = this.verificationCodes.get(verifyEmailDto.email);
        if (!stored) {
            throw new common_1.BadRequestException('Invalid or expired verification code');
        }
        if (stored.expiry < new Date()) {
            this.verificationCodes.delete(verifyEmailDto.email);
            throw new common_1.BadRequestException('Verification code has expired');
        }
        if (stored.code !== verifyEmailDto.code) {
            throw new common_1.BadRequestException('Invalid verification code');
        }
        const user = await this.usersService.findByEmail(verifyEmailDto.email);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.usersService.update(user.id, { emailVerified: true });
        this.verificationCodes.delete(verifyEmailDto.email);
        return {
            success: true,
            message: 'Email verified successfully',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map