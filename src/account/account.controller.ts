import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Expense } from '../expenses/expense.entity';
import { Deposit } from 'src/deposits/deposits.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('deposit')
  async addDeposit(
    @Body('userId') userId: number,
    @Body('amount') amount: number,
    @Body('coupleId') coupleId?: number,
  ): Promise<Deposit> {
    return this.accountService.addDeposit(userId, amount, coupleId);
  }

  @Get('general-balance')
  async getGeneralBalance(): Promise<number> {
    return this.accountService.getGeneralBalance();
  }

  @Post('expense')
  async addExpense(
    @Body('userId') userId: number,
    @Body('amount') amount: number,
    @Body('description') description: string,
  ): Promise<Expense> {
    return this.accountService.addExpense(userId, amount, description);
  }

  @Get('balance/:userId')
  async getBalance(@Param('userId') userId: number): Promise<number> {
    return this.accountService.getBalance(userId);
  }

  @Get('deposits')
  async getAllDeposits(): Promise<Deposit[]> {
    return this.accountService.getAllDeposits();
  }

  @Get('expenses')
  async getAllExpenses(): Promise<Expense[]> {
    return this.accountService.getAllExpenses();
  }
}
