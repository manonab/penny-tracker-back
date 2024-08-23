import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('balance')
  getBalance(): Promise<number> {
    return this.accountService.getGlobalBalance();
  }
}
