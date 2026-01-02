import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorProfileDto } from './create-doctor-profile.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateDoctorProfileDto extends PartialType(CreateDoctorProfileDto) {
  @IsNumber()
  @IsOptional()
  averageRating?: number;

  @IsNumber()
  @IsOptional()
  totalReviews?: number;

  @IsNumber()
  @IsOptional()
  totalConsultations?: number;
}
