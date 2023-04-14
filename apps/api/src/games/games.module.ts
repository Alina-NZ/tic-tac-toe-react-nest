import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GameAIService } from './gameAI.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GameAIService],
})
export class GamesModule {}
