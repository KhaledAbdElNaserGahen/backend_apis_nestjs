import { IsNumber, IsEnum, IsString } from 'class-validator';

export class ApproveUserDto {
  @IsString()
  userId: string | number;

  @IsEnum(['active', 'suspended'])
  status: string;
}
