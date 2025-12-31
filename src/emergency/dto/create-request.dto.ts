import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  serviceId: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
