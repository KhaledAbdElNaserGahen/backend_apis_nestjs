import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
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
}
