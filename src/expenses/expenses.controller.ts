import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { UpdateExpenseDto } from 'src/dto/update-expense.dto';
import { CreateExpenseDto } from 'src/dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Expense> {
    return this.expensesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.expensesService.remove(id);
  }
}
