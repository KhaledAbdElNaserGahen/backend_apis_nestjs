import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  userId: string | number;

  @IsEnum(['patient', 'doctor', 'secretary', 'employee', 'superadmin'])
  role: string;
}
