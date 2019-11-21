import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Winners from './components/pages/Winners';
import Navbar from './components/Navbar';
import './App.css';

const boardSize = 500;
const defaultNumOfRows = 5;
const defaultDelay = 1000;
const defaultCellSize = (boardSize - defaultNumOfRows * 2) / defaultNumOfRows;
let activeCell = {};

const defaultMoves = Array.from(
  { length: defaultNumOfRows ** 2 },
  () => 'default'
);

// Shuffle cells ids in order to facilitate random selection within the 'makeMove' function
const shuffledCells = defaultMoves
  .map((_, i) => i)
  .sort(() => Math.random() - 0.5);

function App() {
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [moves, setMoves] = useState(defaultMoves); // default, active-cell, player, computer
  const [gameStarted, setGameStarted] = useState(false);
  const [settings, setSettings] = useState({
    numberOfRows: defaultNumOfRows,
    cellSize: defaultCellSize,
    delay: defaultDelay
  });

  const handlePlay = () => {
    setGameStarted(true);
    makeMove();
  };

  const handleClick = e => {
    const id = parseInt(e.target.dataset.id);
    activeCell.id === id && (activeCell.status = 'player');
  };

  const checkGameOver = () => {
    const target = settings.numberOfRows ** 2 / 2;
    return (
      score.player > target ||
      score.computer > target ||
      score.player + score.computer === target * 2
    );
  };

  const updateCellStatus = (cellID, status) =>
    setMoves(moves => [...moves].fill(status, cellID, cellID + 1));

  const makeMove = () => {
    // Activate random cell
    activeCell.id = shuffledCells.pop();
    activeCell.status = 'active-cell';
    updateCellStatus(activeCell.id, activeCell.status);
    // If not clicked within the defined interval, mark as selected by computer;
    // Update moves and scores;
    setTimeout(() => {
      activeCell.status === 'active-cell' && (activeCell.status = 'computer');
      updateCellStatus(activeCell.id, activeCell.status);
      setScore(score => ({
        ...score,
        [activeCell.status]: score[activeCell.status] + 1
      }));
    }, settings.delay);
  };

  const reportWinner = () => {
    let winner;
    score.player > score.computer && (winner = 'player');
    score.player < score.computer && (winner = 'computer');
    score.player === score.computer && (winner = 'even');
    alert(winner);
  };

  useEffect(() => {
    gameStarted && !checkGameOver() && makeMove();
  }, [score]);

  useEffect(() => {
    checkGameOver() && reportWinner();
  }, [score]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar play={handlePlay} />
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <Home
                {...props}
                moves={moves}
                boardSize={boardSize}
                handleClick={handleClick}
                cellSize={settings.cellSize}
              />
            )}
          />
          <Route path='/game-settings' component={Settings} />
          <Route path='/winners' component={Winners} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
