import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  userId?: number;

  @IsOptional()
  @IsNumber()
  coupleId?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
