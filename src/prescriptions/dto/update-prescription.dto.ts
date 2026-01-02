import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {
  @IsString()
  @IsOptional()
  status?: string;
}
