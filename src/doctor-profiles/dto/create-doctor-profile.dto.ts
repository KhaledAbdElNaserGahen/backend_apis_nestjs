import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimeSlotDto {
  @IsString()
  day: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

class CredentialDto {
  @IsString()
  title: string;

  @IsString()
  institution: string;

  @IsNumber()
  year: number;
}

export class CreateDoctorProfileDto {
  @IsString()
  specialty: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  subSpecialties?: string[];

  @IsNumber()
  @IsOptional()
  yearsOfExperience?: number;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CredentialDto)
  @IsOptional()
  credentials?: CredentialDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @IsNumber()
  @IsOptional()
  consultationFee?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlotDto)
  @IsOptional()
  availability?: TimeSlotDto[];

  @IsBoolean()
  @IsOptional()
  acceptsNewPatients?: boolean;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
