import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoupleService } from './couple.service';
import { Couple } from './couple.entity';

@Controller('couples')
export class CoupleController {
  constructor(private readonly coupleService: CoupleService) {}

  @Get()
  async findAll(): Promise<Couple[]> {
    return this.coupleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Couple> {
    return this.coupleService.findOne(id);
  }

  @Post()
  async create(@Body('name') name: string): Promise<Couple> {
    return this.coupleService.create(name);
  }
}
