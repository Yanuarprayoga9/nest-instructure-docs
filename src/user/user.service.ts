import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });
    return updatedUser ?? null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //   async update(id: number, user: User): Promise<User | null> {
  //     await this.userRepository.update(id, user);
  //     const userObj = await this.userRepository.findOneBy({ id });
  //     if (!userObj) return null;
  //     return userObj;
  //   }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
