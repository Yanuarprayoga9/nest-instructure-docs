import { IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;
}
