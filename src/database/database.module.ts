import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from 'src/couple/couple.entity';
import { Deposit } from 'src/deposits/deposits.entity';
import { Expense } from 'src/expenses/expense.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('RENDER_DB_URL'),
        port: parseInt(configService.getOrThrow('RENDER_DB_PORT'), 10),
        database: configService.getOrThrow('RENDER_DB'),
        username: configService.getOrThrow('RENDER_DB_USERNAME'),
        password: configService.getOrThrow('RENDER_DB_PASSWORD'),
        migrations: ['migrations/**'],
        entities: [User, Expense, Couple, Deposit],
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
