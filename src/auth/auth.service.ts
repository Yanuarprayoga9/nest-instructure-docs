import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { LoginAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = { sub: user.id, userName: user.userName };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login berhasil',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      accessToken: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
      },
    };
  }
}
