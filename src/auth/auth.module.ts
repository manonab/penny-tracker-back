// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
