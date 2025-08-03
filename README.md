# NestJS MySQL CRUD API with Hot Reload
NestJS is a framework built on top of Node.js, designed for building server-side applications. It uses TypeScript and follows a modular architecture inspired by Angular. This guide helps you build a simple REST API connected to MySQL, including CRUD operations for a `User` entity, and setup for hot reload using Webpack.
### https://sadeesha.medium.com/building-a-scalable-crud-api-with-nestjs-and-mysql-aa2d42280168 

---

## 🚀 Features

* NestJS project structure
* MySQL database integration via TypeORM
* Full CRUD for User entity
* Hot Reload setup with Webpack
* Request validation with `class-validator`

---

## 📦 Installation & Setup

### 1. Install NestJS CLI

```bash
npm i -g @nestjs/cli
```

### 2. Create New Project

```bash
nest new nestjs-mysql
cd nestjs-mysql
```

---

## 🔁 Hot Reload Setup

### Install Dev Dependencies

```bash
npm i --save-dev webpack webpack-node-externals run-script-webpack-plugin
```

### Create `webpack.config.js`

```js
const nodeExternals = require('webpack-node-externals');
const RunScriptWebpackPlugin = require('run-script-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/dist',
  },
  plugins: [new RunScriptWebpackPlugin({ name: 'main.js' })],
};
```

### Update `package.json`

```json
"scripts": {
  "start:dev": "webpack --watch --mode development"
}
```

### Run with Hot Reload

```bash
npm run start:dev
```

---

## 🗄️ MySQL Integration

### Install TypeORM & MySQL2

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

### Configure TypeORM in `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_mysql',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

---

## 👤 User CRUD Module

### Generate Module, Controller, Service

```bash
nest g module user
nest g controller user
nest g service user
```

### Create Entity `user.entity.ts`

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
```

### Update `user.module.ts`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### Implement `user.service.ts`

```ts
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user: User): Promise<User> {
    return this.repo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async update(id: number, user: User): Promise<User> {
    await this.repo.update(id, user);
    return this.repo.findOneBy({ id });
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id).then(() => undefined);
  }
}
```

### Implement `user.controller.ts`

```ts
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(+id);
  }
}
```

---

## ✅ Request Validation

### Install Validator

```bash
npm install class-validator class-transformer
```

### Create DTO `create-user.dto.ts`

```ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}
```

### Use DTO in Controller

```ts
@Post()
create(@Body() userDto: CreateUserDto): Promise<User> {
  return this.userService.create(userDto);
}
```

### Enable Validation Globally

```ts
import { ValidationPipe } from '@nestjs/common';
app.useGlobalPipes(new ValidationPipe());
```

---

## 📫 Testing Endpoints

Run with hot reload:

```bash
npm run start:dev
```

Test with Postman:

* `GET /users`
* `POST /users`
* `PATCH /users/:id`
* `DELETE /users/:id`

---

## 💬 Final Words

You now have a fully functional REST API built with NestJS, MySQL, TypeORM, hot reload, and validation. Great for production with a few tweaks (e.g. set `synchronize: false`).

Happy coding! 🚀
