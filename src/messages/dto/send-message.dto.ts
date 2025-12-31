import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsNumber()
  receiverId: number;

  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(['text', 'image', 'video', 'audio'])
  message_type?: string;

  @IsOptional()
  @IsString()
  media_path?: string;
}
