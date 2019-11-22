import React from 'react';
import '../App.css';

function Cell(props) {
  const { dataID, className, handleClick, cellSize } = props;

  const style = {
    height: cellSize,
    width: cellSize
  };

  return (
    <div
      className={className}
      style={style}
      data-id={dataID}
      onClick={handleClick}
    />
  );
}

export default Cell;
