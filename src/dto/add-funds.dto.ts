import { IsNumber, IsNotEmpty } from 'class-validator';

export class AddFundsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
