import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateVideoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['sign_language', 'medical', 'educational', 'emergency', 'general'])
  category?: string;

  @IsOptional()
  @IsEnum(['processing', 'active', 'inactive'])
  status?: string;
}
