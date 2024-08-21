import { Module } from '@nestjs/common';
import { DepositsService } from './deposits.service';

@Module({
  providers: [DepositsService]
})
export class DepositsModule {}
