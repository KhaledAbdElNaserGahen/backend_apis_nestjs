import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateFamilyMemberDto {
  @IsString()
  name: string;

  @IsEnum(['parent', 'spouse', 'child', 'sibling', 'other'])
  relationship: string;

  @IsOptional()
  @IsString()
  national_id?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: string;

  @IsOptional()
  @IsString()
  medical_info?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
