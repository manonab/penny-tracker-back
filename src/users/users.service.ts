import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Expense } from 'src/expenses/expense.entity';
import { Deposit } from 'src/deposits/deposits.entity';
import { Couple } from 'src/couple/couple.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,

    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,

    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUserBalance(userId: number): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['deposits', 'expenses'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const totalDeposits = user.deposits.reduce(
      (total, deposit) => total + deposit.amount,
      0,
    );
    const totalExpenses = user.expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );

    return totalDeposits - totalExpenses;
  }
  async associateUserToCouple(userId: number, coupleId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['couple'],
    });

    const couple = await this.coupleRepository.findOneBy({ id: coupleId });

    if (!user || !couple) {
      throw new Error('User or Couple not found');
    }

    user.couple = couple;
    return this.userRepository.save(user);
  }
}
