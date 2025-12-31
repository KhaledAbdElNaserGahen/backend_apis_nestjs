import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(['sign_language', 'medical', 'educational', 'emergency', 'general'])
  category: string;

  @IsOptional()
  @IsString()
  duration?: string;
}
