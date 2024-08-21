import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DepositsModule } from './deposits/deposits.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [UsersModule, DepositsModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
