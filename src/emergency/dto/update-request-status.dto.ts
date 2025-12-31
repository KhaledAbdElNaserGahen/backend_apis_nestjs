import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRequestStatusDto {
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  status: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
