import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Deposits } from '../deposits/deposits.entity';
import { Expense } from '../expenses/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Deposits, Expense])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
