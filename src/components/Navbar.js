import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import inconSettings from '../assets/settings.svg';
import iconTrophy from '../assets/trophy.svg';
import iconHome from '../assets/home.svg';

function Navbar(props) {
  const { inputName, start, restart, gameStatus } = props;

  const renderBtn = () =>
    gameStatus.end ? (
      <button onClick={restart}>Play again</button>
    ) : (
      <button onClick={start}>Play</button>
    );

  return (
    <div className='Navbar'>
      <input
        type='text'
        placeholder='Enter your name'
        onInput={e => inputName(e.target.value)}
      />
      {renderBtn()}
      <Link to='/game_in_dots/game-settings'>
        <img src={inconSettings} alt='Settings' />
      </Link>
      <Link to='/game_in_dots/winners'>
        <img src={iconTrophy} alt='Winners' />
      </Link>
      <Link to='/game_in_dots/'>
        <img src={iconHome} alt='Home' />
      </Link>
    </div>
  );
}

export default Navbar;
