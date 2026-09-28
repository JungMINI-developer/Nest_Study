import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional() // 필수값이 아닌 선택
  @IsString()
  title: string;

  @IsOptional() // 필수값이 아닌 선택
  @IsString()
  content: string;

  @IsOptional() // 필수값이 아닌 선택
  @IsString()
  category: string;

  @IsOptional() // 필수값이 아닌 선택
  @IsString()
  thumbnail: string;
}
