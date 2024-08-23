import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from '../expenses/expense.entity';
import { User } from '../users/user.entity';
import { Couple } from '../couple/couple.entity';
import { Deposit } from 'src/deposits/deposits.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,
  ) {}

  async addDeposit(
    userId: number,
    amount: number,
    coupleId?: number,
  ): Promise<Deposit> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const couple = coupleId
      ? await this.coupleRepository.findOne({ where: { id: coupleId } })
      : null;

    if (!user && !couple) {
      throw new Error('User or Couple not found');
    }

    const deposit = this.depositRepository.create({
      amount,
      user,
      couple,
    });

    return this.depositRepository.save(deposit);
  }

  // Ajouter une dépense
  async addExpense(
    userId: number,
    amount: number,
    description: string,
  ): Promise<Expense> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const expense = this.expenseRepository.create({
      user,
      amount,
      description,
    });

    return this.expenseRepository.save(expense);
  }

  // Obtenir le solde d'un utilisateur
  async getBalance(userId: number): Promise<number> {
    const depositResult = await this.depositRepository
      .createQueryBuilder('deposit')
      .select('SUM(deposit.amount)', 'total')
      .where('deposit.userId = :userId', { userId })
      .getRawOne();

    const expenseResult = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.userId = :userId', { userId })
      .getRawOne();

    const totalDeposits = parseFloat(depositResult.total) || 0;
    const totalExpenses = parseFloat(expenseResult.total) || 0;

    return totalDeposits - totalExpenses;
  }

  async getAllDeposits(): Promise<Deposit[]> {
    return this.depositRepository.find();
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }
}
