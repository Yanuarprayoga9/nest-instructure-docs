import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Replace with your MySQL host
      port: 3306, // Default MySQL port
      username: 'root', // Replace with your MySQL username
      password: '', // Replace with your MySQL password
      database: 'nestjs_mysql', // Replace with your database name
      entities: [User], // ✅ Tambahkan entitas User di sini
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
