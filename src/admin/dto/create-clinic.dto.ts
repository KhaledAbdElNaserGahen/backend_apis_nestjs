import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsString()
  specialty: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  doctorId?: string | number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  working_hours?: string;

  @IsOptional()
  working_days?: string[];

  @IsOptional()
  @IsNumber()
  max_daily_appointments?: number;
}
