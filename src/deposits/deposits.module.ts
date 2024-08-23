import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './deposits.entity';
import { DepositService } from './deposits.service';
import { DepositController } from './deposits.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Deposit])],
  providers: [DepositService],
  controllers: [DepositController],
  exports: [DepositService],
})
export class DepositModule {}
