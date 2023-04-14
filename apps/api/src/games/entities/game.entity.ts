import { v4 as uuidv4 } from 'uuid';

// export const gameStatus = {
//   RUNNING: 'RUNNING',
//   X_WON: 'X_WON',
//   O_WON: 'O_WON',
//   DRAW: 'DRAW',
// };

export class Game {
  readonly id: string;
  // format: uuid
  // description: The game's UUID, read-only, generated by the server. The client can not POST or PUT this.
  // readOnly: true
  board: string;
  // description: The board state
  // example: XO--X--OX
  status: 'RUNNING' | 'X_WON' | 'O_WON' | 'DRAW';
  // status: gameStatus.RUNNING | gameStatus.X_WON;
  // readOnly: true
  // description: The game status, read-only, the client can not POST or PUT this
  // enum:

  constructor() {
    this.id = uuidv4();
    this.board = '---------';
    this.status = 'RUNNING';
  }
}

// export const gameStatus = {
//   RUNNING: 'RUNNING',
//   X_WON: 'X_WON',
//   O_WON: 'O_WON',
//   DRAW: 'DRAW',
// };
