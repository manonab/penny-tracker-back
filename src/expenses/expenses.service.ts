// src/expenses/expenses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { UpdateExpenseDto } from 'src/dto/update-expense.dto';
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

  findOne(id: number): Promise<Expense> {
    return this.expenseRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    await this.expenseRepository.update(id, updateExpenseDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
