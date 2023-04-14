import { Tile } from 'src/components/Tile/Tile';
import './Board.css'

export function Board({ data, move }) {
    return <div className='Board'>
        {
            data?.map((tile, index) => {
                return <Tile key={index} tile={tile} index={index} move={move} />;
            })
        }
    </div>
}
