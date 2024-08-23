import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Couple } from '../couple/couple.entity';
import { Expense } from '../expenses/expense.entity';
import { Deposit } from 'src/deposits/deposits.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @ManyToOne(() => Couple, (couple) => couple.users, { nullable: true })
  couple: Couple;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @OneToMany(() => Deposit, (deposit) => deposit.user)
  deposits: Deposit[];
}
