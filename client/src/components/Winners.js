import React from 'react';
import '../App.css';

function Winners(props) {
  const { winnersList } = props;

  const renderWinners = winnersList.map(el => {
    const date = new Date(el.date);
    const dmyDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    return (
      <li key={el._id} className='winner'>
        {el.name}
        {dmyDate}
      </li>
    );
  });

  return (
    <div className='Winners'>
      <ul>{renderWinners}</ul>
    </div>
  );
}

export default Winners;
