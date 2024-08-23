import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { AddFundsDto } from 'src/dto/add-funds.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('balance')
  getBalance(): Promise<number> {
    return this.accountService.getBalance();
  }

  @Post('add-funds')
  addFunds(@Body() addFundsDto: AddFundsDto): Promise<number> {
    return this.accountService.addFunds(addFundsDto);
  }
}
