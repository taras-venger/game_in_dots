import React from 'react';
import '../App.css';

function MessageBox(props) {
  const { end, result } = props.gameStatus;

  const showMessage = () =>
    end && result !== 'draw' ? `${result} won!` : result;

  return <div className='MessageBox'>{showMessage()}</div>;
}

export default MessageBox;
