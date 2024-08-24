import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Deposit } from '../deposits/deposits.entity';
import { Expense } from '../expenses/expense.entity';
import { Couple } from 'src/couple/couple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Deposit, Expense, Couple])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
