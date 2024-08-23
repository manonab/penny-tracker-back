import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Expense } from '../expenses/expense.entity';
import { User } from '../users/user.entity';
import { Couple } from '../couple/couple.entity';
import { Deposit } from 'src/deposits/deposits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit, Expense, User, Couple])],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
