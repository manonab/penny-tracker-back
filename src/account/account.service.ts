import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from 'src/expenses/expense.entity';
import { Deposits } from 'src/deposits/deposits.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Deposits)
    private readonly depositRepository: Repository<Deposits>,
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async getGlobalBalance(): Promise<number> {
    const totalDeposits = await this.depositRepository
      .createQueryBuilder('deposit')
      .select('SUM(deposit.amount)', 'sum')
      .getRawOne();

    const totalExpenses = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'sum')
      .getRawOne();

    const deposits = totalDeposits.sum || 0;
    const expenses = totalExpenses.sum || 0;

    return deposits - expenses;
  }
}
