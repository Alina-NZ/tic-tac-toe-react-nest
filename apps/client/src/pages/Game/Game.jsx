import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Board } from 'src/components/Board/Board';
import './Game.css'

export const Game = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState([]);

  const getGame = async () => {
    const response = await fetch(`/api/games/${gameId}`);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    getGame().then(data => {
      setGame(data);
    });
  }, []);

  const handleMove = async (index) => {
    if (game.status != 'RUNNING') {
      return;
    }
    const newBoardData = [...game.board];
    if (newBoardData[index] === '-') {
      newBoardData[index] = 'X';

      const updatedGame = {
        'id': gameId,
        'board': newBoardData.join(''),
        'status': game.status
      }

      const response = await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedGame),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      });
      const result = await response.json();
      setGame(result);
    }
  }

  return <div className='GamePage'>
    <h1>Game page</h1>
    <h3>Game {gameId}</h3>
    <h3>Status: {game.status}</h3>
    <NavLink to="/">Menu</NavLink>
    <div className='BoardWrapper'>
      <Board data={game.board?.split('')} move={handleMove} />
    </div>
    {/* <Board data={game.board?.split('')} move={handleMove} /> */}
  </div>
}