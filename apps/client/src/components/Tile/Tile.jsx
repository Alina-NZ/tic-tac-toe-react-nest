import './Tile.css'

export function Tile({ tile, index, move }) {
  return <div className='Tile' onClick={() => move(index)}>
    <h1>{tile != '-' ? tile : null}</h1>
  </div>
}
