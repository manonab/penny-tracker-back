import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Expense } from './expenses/expense.entity';
import { Couple } from './couple/couple.entity';
import { Deposits } from './deposits/deposits.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRESQL_ADDON_HOST'),
  port: configService.getOrThrow('POSTGRESQL_ADDON_PORT'),
  database: configService.getOrThrow('POSTGRESQL_ADDON_DB'),
  username: configService.getOrThrow('POSTGRESQL_ADDON_USER'),
  password: configService.getOrThrow('POSTGRESQL_ADDON_PASSWORD'),
  migrations: ['src/migrations/*.ts'],
  entities: [User, Expense, Couple, Deposits],
});
