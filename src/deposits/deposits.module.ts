import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './deposits.entity';
import { DepositService } from './deposits.service';
import { DepositController } from './deposits.controller';
import { User } from 'src/users/user.entity';
import { Couple } from 'src/couple/couple.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Deposit, User, Couple])],
  providers: [DepositService],
  controllers: [DepositController],
  exports: [DepositService],
})
export class DepositModule {}
