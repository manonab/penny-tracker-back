import { IsNumber } from 'class-validator';

export class AssociateUserToCoupleDto {
  @IsNumber()
  readonly coupleId: number;
}
