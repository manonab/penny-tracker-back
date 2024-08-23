import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from 'src/couple/couple.entity';
import { Deposits } from 'src/deposits/deposits.entity';
import { Expense } from 'src/expenses/expense.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRESQL_ADDON_HOST'),
        port: configService.getOrThrow('POSTGRESQL_ADDON_PORT'),
        database: configService.getOrThrow('POSTGRESQL_ADDON_DB'),
        username: configService.getOrThrow('POSTGRESQL_ADDON_USER'),
        password: configService.getOrThrow('POSTGRESQL_ADDON_PASSWORD'),
        migrations: ['migrations/**'],
        entities: [User, Expense, Couple, Deposits],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
