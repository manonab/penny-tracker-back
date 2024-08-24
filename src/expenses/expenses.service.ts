// src/expenses/expenses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from 'src/dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = this.expenseRepository.create(createExpenseDto);
    return this.expenseRepository.save(expense);
  }

  findAll(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }

  async findByUser(userId: number): Promise<Expense[]> {
    return this.expenseRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const result = await this.expenseRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Expense not found');
    }
  }
}
