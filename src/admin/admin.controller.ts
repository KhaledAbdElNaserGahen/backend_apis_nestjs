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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PERMISSIONS, PERMISSION_GROUPS } from './constants/permissions';

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

  // ==================== Role Management ====================

  @Get('permissions')
  async getPermissions() {
    return {
      success: true,
      data: {
        permissions: PERMISSIONS,
        groups: PERMISSION_GROUPS,
      },
    };
  }

  @Post('roles')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.adminService.createRole(createRoleDto);
    return {
      success: true,
      data: { role },
      message: 'Role created successfully',
    };
  }

  @Get('roles')
  async getRoles() {
    const roles = await this.adminService.getRoles();
    return {
      success: true,
      data: { roles },
    };
  }

  @Get('roles/:id')
  async getRole(@Param('id') id: string) {
    const role = await this.adminService.getRole(id);
    return {
      success: true,
      data: { role },
    };
  }

  @Put('roles/:id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.adminService.updateRole(id, updateRoleDto);
    return {
      success: true,
      data: { role },
      message: 'Role updated successfully',
    };
  }

  @Delete('roles/:id')
  async deleteRole(@Param('id') id: string) {
    await this.adminService.deleteRole(id);
    return {
      success: true,
      message: 'Role deleted successfully',
    };
  }
}
