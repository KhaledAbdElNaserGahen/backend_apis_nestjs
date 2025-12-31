import { Controller, Post, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.userId);
    return {
      success: true,
      message: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-profile')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.update(req.user.userId, updateProfileDto);
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'تم التحديث بنجاح',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return {
      success: true,
      message: 'تم تسجيل الخروج بنجاح',
    };
  }
}
