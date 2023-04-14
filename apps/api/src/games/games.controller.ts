import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Response } from 'express';
import { NotFoundError, ValidationError } from 'src/common/errors';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ description: 'Get all games.' })
  @ApiOkResponse({
    description:
      'Successful response, returns an array of games, returns an empty array if no users found',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    try {
      return this.gamesService.getAll();
    } catch (e) {
      throw e;
    }
  }

  @Post()
  @ApiOperation({ description: 'Start a new game.' })
  @ApiCreatedResponse({
    description: 'Game successfully started',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  create(@Res() res: Response) {
    try {
      const game = this.gamesService.create();
      res.set('Location', game.id);
      res.status(HttpStatus.CREATED).json({ location: game.id }).send();
    } catch (e) {
      throw e;
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get a game.' })
  @ApiOkResponse({ description: 'Successful response, returns the game' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    try {
      return this.gamesService.findOne(id);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new BadRequestException(e.message);
      }
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Put(':id')
  @ApiOperation({ description: 'Post a new move to a game.' })
  @ApiOkResponse({
    description:
      "Move successfully registered, also provide backend's response move in response",
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gamesService.update(id, updateGameDto);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new BadRequestException(e.message);
      }
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete a game.' })
  @ApiOkResponse({ description: 'Game successfully deleted' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: string) {
    try {
      return this.gamesService.remove(id);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new BadRequestException(e.message);
      }
      if (e instanceof NotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
  }
}
