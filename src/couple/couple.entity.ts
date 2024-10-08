import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Expense } from '../expenses/expense.entity';
import { Deposit } from '../deposits/deposits.entity';

@Entity()
export class Couple {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.couple)
  users: User[];

  @OneToMany(() => Expense, (expense) => expense.couple)
  expenses: Expense[];

  @OneToMany(() => Deposit, (deposit) => deposit.couple)
  deposits: Deposit[];
}
