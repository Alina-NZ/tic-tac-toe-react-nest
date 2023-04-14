import { IsString, Length } from '@nestjs/class-validator';

export class UpdateGameDto {
  @IsString()
  id: string;

  @IsString()
  @Length(9)
  board: string;

  @IsString()
  status: 'RUNNING' | 'X_WON' | 'O_WON' | 'DRAW';
}
