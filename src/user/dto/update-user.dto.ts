// src/user/dto/update-user.dto.ts
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  fullName?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  userName?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password?: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email?: string;
}
