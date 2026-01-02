import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto, VerifyEmailDto } from './dto/password-reset.dto';

@Injectable()
export class AuthService {
  private resetCodes = new Map<string, { code: string; expiry: Date }>();
  private verificationCodes = new Map<string, { code: string; expiry: Date }>();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      age: registerDto.age ? parseInt(registerDto.age) : undefined,
    });

    // Generate token
    const token = this.generateToken(user);

    return {
      success: true,
      data: { token },
      message: 'تم التسجيل بنجاح',
    };
  }

  async login(loginDto: LoginDto) {
    // Find user
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('بيانات غير صحيحة');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('بيانات غير صحيحة');
    }

    // Update last login
    await this.usersService.update(user.id, { lastLogin: new Date() });

    // Generate token
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

  private generateToken(user: any): string {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: number) {
    const userIdStr = typeof userId === 'number' ? userId.toString() : userId;
    return this.usersService.findOne(userIdStr);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message: 'If the email exists, a reset code has been sent',
      };
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store code (in production, use Redis or database)
    this.resetCodes.set(forgotPasswordDto.email, { code, expiry });

    // TODO: Send email with code
    console.log(`Password reset code for ${forgotPasswordDto.email}: ${code}`);

    return {
      success: true,
      message: 'Reset code sent to your email',
      // For development only - remove in production
      dev: { code },
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const stored = this.resetCodes.get(resetPasswordDto.email);

    if (!stored) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    if (stored.expiry < new Date()) {
      this.resetCodes.delete(resetPasswordDto.email);
      throw new BadRequestException('Reset code has expired');
    }

    if (stored.code !== resetPasswordDto.code) {
      throw new BadRequestException('Invalid reset code');
    }

    // Update password
    const user = await this.usersService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(user.id, { password: hashedPassword });

    // Clear reset code
    this.resetCodes.delete(resetPasswordDto.email);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }

  async sendVerificationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    this.verificationCodes.set(email, { code, expiry });

    // TODO: Send email with code
    console.log(`Verification code for ${email}: ${code}`);

    return {
      success: true,
      message: 'Verification code sent to your email',
      // For development only
      dev: { code },
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const stored = this.verificationCodes.get(verifyEmailDto.email);

    if (!stored) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    if (stored.expiry < new Date()) {
      this.verificationCodes.delete(verifyEmailDto.email);
      throw new BadRequestException('Verification code has expired');
    }

    if (stored.code !== verifyEmailDto.code) {
      throw new BadRequestException('Invalid verification code');
    }

    // Mark email as verified
    const user = await this.usersService.findByEmail(verifyEmailDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.usersService.update(user.id, { emailVerified: true });

    // Clear verification code
    this.verificationCodes.delete(verifyEmailDto.email);

    return {
      success: true,
      message: 'Email verified successfully',
    };
  }
}
