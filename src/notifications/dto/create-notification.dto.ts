import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ar?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  message_ar?: string;

  @IsEnum(['appointment', 'message', 'emergency', 'system', 'prescription'])
  type: string;

  @IsOptional()
  @IsObject()
  data?: any;
}
