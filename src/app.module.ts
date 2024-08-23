import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { ExpenseModule } from './expenses/expenses.module';
import { CoupleModule } from './couple/couple.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { DepositsModule } from './deposits/deposits.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ExpenseModule,
    CoupleModule,
    AccountModule,
    AuthModule,
    DepositsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
