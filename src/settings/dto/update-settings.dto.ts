import { IsEnum, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsEnum(['ar', 'en'])
  language?: string;

  @IsOptional()
  @IsBoolean()
  notifications_enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  sound_enabled?: boolean;

  @IsOptional()
  @IsBoolean()
  vibration_enabled?: boolean;

  @IsOptional()
  @IsEnum(['small', 'medium', 'large'])
  font_size?: string;

  @IsOptional()
  @IsEnum(['light', 'dark'])
  theme?: string;

  @IsOptional()
  @IsBoolean()
  show_online_status?: boolean;
}
