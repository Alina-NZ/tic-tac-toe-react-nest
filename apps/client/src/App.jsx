import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Game } from './pages/Game/Game';
import { Error } from './pages/Error';
import { ROUTES } from './common/constants';
import './App.css';

const fetchGame = async ({ params }) => {
  const response = await fetch(`/api/games/${params.gameId}`);
  return await response.json();
}

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: ROUTES.game,
    element: <Game />,
    loader: fetchGame,
    errorElement: <Error />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
