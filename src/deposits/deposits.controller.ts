import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { Deposit } from './deposits.entity';
import { DepositService } from './deposits.service';

@Controller('deposits')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  async createDeposit(
    @Body('amount') amount: number,
    @Body('userId') userId: number,
    @Body('coupleId') coupleId?: number,
  ): Promise<Deposit> {
    return this.depositService.createDeposit(amount, userId, coupleId);
  }

  @Get()
  async getAllDeposits(): Promise<Deposit[]> {
    return this.depositService.findAllDeposits();
  }

  @Get(':id')
  async getDepositById(@Param('id') id: number): Promise<Deposit> {
    return this.depositService.findDepositById(id);
  }
}
