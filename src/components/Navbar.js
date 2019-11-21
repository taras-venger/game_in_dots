import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import inconSettings from '../assets/settings.svg';
import iconTrophy from '../assets/trophy.svg';
import iconHome from '../assets/home.svg';

function Navbar(props) {
  return (
    <div className='Navbar'>
      <input type='text' placeholder='Enter your name' />
      <button onClick={props.play}>Play</button>
      <Link to='/game-settings'>
        <img src={inconSettings} alt='Settings' />
      </Link>
      <Link to='/winners'>
        <img src={iconTrophy} alt='Winners' />
      </Link>
      <Link to='/'>
        <img src={iconHome} alt='Home' />
      </Link>
    </div>
  );
}

export default Navbar;
