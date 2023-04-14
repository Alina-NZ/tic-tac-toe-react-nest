import { Injectable } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GameAIService } from './gameAI.service';
import { NotFoundError, ValidationError } from 'src/common/errors';
import { UUID_REGEXP } from 'src/common/constants';

@Injectable()
export class GamesService {
  constructor(private gameAIService: GameAIService) {}

  private games: Game[] = [];

  getAll(): Game[] {
    return this.games;
  }

  create(): Game {
    const game = new Game();
    this.games.push(game);
    return game;
  }

  findOne(id: string): Game {
    if (!id.match(UUID_REGEXP)) {
      throw new ValidationError('Game ID is not valid');
    }

    const game = this.games.find((game) => game.id === id);
    if (!game) {
      throw new NotFoundError(`There is no game with id: ${id}`);
    }

    return game;
  }

  update(id: string, updateGameDto: UpdateGameDto): Game {
    if (!id.match(UUID_REGEXP)) {
      throw new ValidationError('Game ID is not valid');
    }

    const index = this.games.findIndex((game) => game.id === id);

    if (index === -1) {
      throw new NotFoundError(
        `There is no game with id: ${id} so next move can not be performed`,
      );
    }

    // At first, check if human has won or it's a draw
    const preCheck = this.gameAIService.checkWinner(
      this.gameAIService.convertToMultiArr(updateGameDto.board),
    );

    if (preCheck) {
      const game: Game = {
        id: updateGameDto.id,
        board: updateGameDto.board,
        status: this.getNewStatus(preCheck),
      };

      this.games[index] = game;
      return this.games[index];
    }

    // AI makes next move
    const newBoard = this.gameAIService.bestMove(
      this.gameAIService.convertToMultiArr(updateGameDto.board),
    );
    this.games[index].board = newBoard;

    // Check if AI has won or it's a draw
    const postCheck = this.gameAIService.checkWinner(
      this.gameAIService.convertToMultiArr(this.games[index].board),
    );

    if (postCheck) {
      const game: Game = {
        id: updateGameDto.id,
        board: this.games[index].board,
        status: this.getNewStatus(postCheck),
      };

      this.games[index] = game;
    }

    return this.games[index];
  }

  remove(id: string): void {
    if (!id.match(UUID_REGEXP)) {
      throw new ValidationError('Game ID is not valid');
    }

    if (!this.games.some((game) => game.id === id)) {
      throw new NotFoundError(
        `There is no game with ID: ${id} so removing can not be performed`,
      );
    }

    this.games = this.games.filter((game) => game.id != id);
  }

  private getNewStatus(check: string): 'X_WON' | 'O_WON' | 'DRAW' {
    let newStatus: 'X_WON' | 'O_WON' | 'DRAW';

    switch (check) {
      case 'X': {
        newStatus = 'X_WON';
        break;
      }
      case '0': {
        newStatus = 'O_WON';
        break;
      }
      case 'DRAW': {
        newStatus = 'DRAW';
        break;
      }
      default: {
        break;
      }
    }

    return newStatus;
  }
}
