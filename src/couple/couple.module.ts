import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoupleService } from './couple.service';
import { CoupleController } from './couple.controller';
import { Couple } from './couple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  providers: [CoupleService],
  controllers: [CoupleController],
  exports: [CoupleService],
})
export class CoupleModule {}
