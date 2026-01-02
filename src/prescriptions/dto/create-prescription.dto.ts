import { IsString, IsArray, IsOptional, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class MedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;

  @IsString()
  duration: string;

  @IsString()
  @IsOptional()
  instructions?: string;
}

export class CreatePrescriptionDto {
  @IsString()
  patientId: string;

  @IsString()
  @IsOptional()
  appointmentId?: string;

  @IsString()
  diagnosis: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  medications: MedicationDto[];

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  validUntil?: string;
}
