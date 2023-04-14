import { Injectable } from '@nestjs/common';

@Injectable()
export class GameAIService {
  convertToMultiArr(board: string) {
    const arr = board.split('');
    return [
      [arr[0], arr[1], arr[2]],
      [arr[3], arr[4], arr[5]],
      [arr[6], arr[7], arr[8]],
    ];
  }

  convertToString(multiArr): string {
    const arr: string[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        arr.push(multiArr[i][j]);
      }
    }
    return arr.join('');
  }

  equals3(a, b, c) {
    return a == b && b == c && a != '-';
  }

  checkWinner(board) {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      if (this.equals3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }

    // Diagonal
    if (this.equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (this.equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '-') {
          openSpots++;
        }
      }
    }

    if (winner == null && openSpots == 0) {
      return 'DRAW';
    } else {
      return winner;
    }
  }

  bestMove(board): string {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '-') {
          board[i][j] = '0';
          const score = this.minimax(board, 0, false);
          board[i][j] = '-';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    board[move.i][move.j] = '0';
    return this.convertToString(board);
  }

  scores = {
    X: -10,
    0: 10,
    DRAW: 0,
  };

  minimax(board, depth, isMaximizing) {
    const result = this.checkWinner(board);
    if (result !== null) {
      return this.scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '-') {
            board[i][j] = '0'; //ai
            const score = this.minimax(board, depth + 1, false);
            board[i][j] = '-';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '-') {
            board[i][j] = 'X'; // human
            const score = this.minimax(board, depth + 1, true);
            board[i][j] = '-';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
}
