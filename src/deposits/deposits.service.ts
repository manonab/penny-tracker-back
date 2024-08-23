import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Couple } from '../couple/couple.entity';
import { Deposit } from './deposits.entity';

@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,
  ) {}

  async createDeposit(
    amount: number,
    userId: number,
    coupleId?: number,
  ): Promise<Deposit> {
    const user = userId
      ? await this.userRepository.findOneBy({ id: userId })
      : null;

    const couple = coupleId
      ? await this.coupleRepository.findOneBy({ id: coupleId })
      : null;

    const deposit = this.depositRepository.create({
      amount,
      user,
      couple,
    });

    return this.depositRepository.save(deposit);
  }

  async findAllDeposits(): Promise<Deposit[]> {
    return this.depositRepository.find();
  }

  async findDepositById(id: number): Promise<Deposit> {
    return this.depositRepository.findOneBy({ id });
  }
}
