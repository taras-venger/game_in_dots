import React from 'react';
import '../App.css';
import { Message } from 'semantic-ui-react';

const timeToStr = minutes => (minutes < 10 ? `0${minutes}` : minutes);

function Winners(props) {
  const { winnersList } = props;

  const renderWinners = winnersList.map(el => {
    const date = new Date(el.date);
    const dateTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${timeToStr(
      date.getHours()
    )}:${timeToStr(date.getMinutes())}`;
    return (
      <Message key={el._id} className='winner-message'>
        <span>{el.name}</span>
        <span>{dateTime}</span>
      </Message>
    );
  });

  return (
    <div className='Winners'>
      <div className='MessageBox'>Leaders board</div>
      <ul>{renderWinners}</ul>
    </div>
  );
}

export default Winners;
