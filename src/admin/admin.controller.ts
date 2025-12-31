import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { AdminService } from './admin.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { ApproveUserDto } from './dto/approve-user.dto';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('superadmin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers(@Query() filters: any) {
    const users = await this.adminService.getUsers(filters);
    return {
      success: true,
      data: { users },
    };
  }

  @Put('users/role')
  async updateUserRole(@Body() updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.adminService.updateUserRole(updateUserRoleDto);
    return {
      success: true,
      data: { user },
      message: 'User role updated successfully',
    };
  }

  @Post('users/approve')
  async approveUser(@Body() approveUserDto: ApproveUserDto) {
    const user = await this.adminService.approveUser(approveUserDto);
    return {
      success: true,
      data: { user },
      message: 'User status updated successfully',
    };
  }

  @Post('clinics')
  async createClinic(@Body() createClinicDto: CreateClinicDto) {
    const clinic = await this.adminService.createClinic(createClinicDto);
    return {
      success: true,
      data: { clinic },
      message: 'Clinic created successfully',
    };
  }

  @Get('statistics')
  async getStatistics() {
    const statistics = await this.adminService.getStatistics();
    return {
      success: true,
      data: { statistics },
    };
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.adminService.deleteUser(+id);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
