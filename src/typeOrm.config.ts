import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Expense } from './expenses/expense.entity';
import { Couple } from './couple/couple.entity';
import { Deposit } from './deposits/deposits.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  url: configService.getOrThrow('RENDER_DB_URL'),
  port: parseInt(configService.getOrThrow('RENDER_DB_PORT'), 10),
  database: configService.getOrThrow('RENDER_DB'),
  username: configService.getOrThrow('RENDER_DB_USERNAME'),
  password: configService.getOrThrow('RENDER_DB_PASSWORD'),
  migrations: ['src/migrations/*.ts'],
  entities: [User, Expense, Couple, Deposit],
  ssl: {
    rejectUnauthorized: false,
  },
});
