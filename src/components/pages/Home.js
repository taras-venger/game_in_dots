import React from 'react';
import '../../App.css';
import Cell from '../Cell';
import MessageBox from '../MessageBox';

const boardSize = 500;

function Home(props) {
  const { moves, fieldSize, handleClick, gameStatus } = props;
  const cellSize = (boardSize - fieldSize * 2) / fieldSize;

  const renderCells = moves.map((move, i) => (
    <Cell
      key={i}
      dataID={i}
      className={move}
      handleClick={handleClick}
      cellSize={cellSize}
    />
  ));

  return (
    <div className='Home'>
      <MessageBox gameStatus={gameStatus} />
      <div className='Board' style={{ height: boardSize, width: boardSize }}>
        {renderCells}
      </div>
    </div>
  );
}

export default Home;
