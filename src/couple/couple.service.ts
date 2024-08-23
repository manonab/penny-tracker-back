import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Couple } from './couple.entity';

@Injectable()
export class CoupleService {
  constructor(
    @InjectRepository(Couple)
    private readonly coupleRepository: Repository<Couple>,
  ) {}

  async findAll(): Promise<Couple[]> {
    return this.coupleRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Couple> {
    return this.coupleRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async create(name: string): Promise<Couple> {
    const couple = this.coupleRepository.create({ name });
    return this.coupleRepository.save(couple);
  }
}
