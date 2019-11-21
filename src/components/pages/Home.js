import React, { useState, useEffect } from 'react';
import '../../App.css';
import Cell from '../Cell';

function Home(props) {
  const { moves, boardSize, handleClick, cellSize } = props;
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
      <div className='Board' style={{ height: boardSize, width: boardSize }}>
        {renderCells}
      </div>
    </div>
  );
}

export default Home;
