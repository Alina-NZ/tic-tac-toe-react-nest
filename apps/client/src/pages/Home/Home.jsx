import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import './Home.css'

export const Home = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames().then(data => {
            setGames(data);
        });
    }, []);

    const getGames = async () => {
        const response = await fetch('/api/games');
        return await response.json();
    };

    const createGame = async () => {
        const response = await fetch('/api/games', {
            method: 'POST',
            body: null
        });
        const result = await response.json();
        navigate(`/game/${result.location}`);
    };

    const deleteGame = async (id) => {
        await fetch(`/api/games/${id}`, {
            method: 'DELETE'
        });
        getGames().then(data => {
            setGames(data);
        });
    };

    return <div>
        <h1>Home page</h1>
        <button onClick={createGame}>New Game</button>
        <div className="Gameslist">
            {
                games.map((game) => {
                    return <div className="GameItem" key={game.id}>
                        <NavLink to={`/game/${game.id}`}>{game.id}</NavLink>
                        <button onClick={() => deleteGame(game.id)}>X</button>
                    </div>
                })
            }
        </div>
        {/* <ol>
            {
                games.map((game) => {
                    return <li key={game.id}>
                        <NavLink to={`/game/${game.id}`}>{game.id}</NavLink>
                        <button onClick={() => deleteGame(game.id)}>X</button>
                    </li>
                })
            }
        </ol> */}
    </div>
}