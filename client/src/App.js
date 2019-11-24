import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import Settings from './components/pages/Settings';
import Winners from './components/pages/Winners';
import Navbar from './components/Navbar';
import './App.css';

const initSettings = { fieldSize: 5, delay: 1000 };
const initScore = { player: 0, computer: 0 };
const initGameStatus = { start: false, end: false, result: '' };
const initMoves = Array.from(
  { length: initSettings.fieldSize ** 2 },
  () => 'default'
);

// Shuffle cells ids in order to facilitate random selection within the 'makeMove' function
const shuffleArray = arr =>
  arr.map((_, i) => i).sort(() => Math.random() - 0.5);
let shuffledCells = shuffleArray(initMoves);
let activeCell = {};

function App() {
  const [playerName, setPlayerName] = useState('');
  const [settings, setSettings] = useState(initSettings);
  const [moves, setMoves] = useState(initMoves); // default, active-cell, player, computer
  const [score, setScore] = useState(initScore);
  const [gameStatus, setGameStatus] = useState(initGameStatus);
  const [winnersList, setWinnersList] = useState([]); // fetched from DB
  const [settingOptions, setSettingOptions] = useState([]); // fetched from DB

  useEffect(() => {
    const getData = async () => {
      const settings = await fetchData('/game-settings');
      const winnersList = await fetchData('/winners');
      setSettingOptions(settings);
      setWinnersList(winnersList);
    };
    getData();
  }, []);

  const handleStart = () => {
    setGameStatus({ ...gameStatus, start: true });
    makeMove();
  };

  const handleRestart = () => {
    setTimeout(() => {
      shuffledCells = shuffleArray(initMoves);
      setMoves(initMoves);
      setScore(initScore);
      setGameStatus({ ...initGameStatus, start: true });
    }, 500);
  };

  const handleClick = e => {
    const id = parseInt(e.target.dataset.id);
    activeCell.id === id && (activeCell.status = 'player');
  };

  const checkGameOver = () => {
    const target = settings.fieldSize ** 2 / 2;
    return (
      score.player > target ||
      score.computer > target ||
      score.player + score.computer === target * 2
    );
  };

  const setGameOver = () => {
    let result;
    score.player > score.computer && (result = playerName || 'player');
    score.player < score.computer && (result = 'computer');
    score.player === score.computer && (result = 'draw');
    setGameStatus({ ...gameStatus, end: true, result: result });
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

  useEffect(() => {
    gameStatus.start && !checkGameOver() && makeMove();
  }, [score]);

  useEffect(() => {
    checkGameOver() && setGameOver();
  }, [score]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar
          start={handleStart}
          restart={handleRestart}
          inputName={n => setPlayerName(n)}
          gameStatus={gameStatus}
        />
        <Switch>
          <Route
            exact
            path='/game_in_dots/'
            render={props => (
              <Home
                {...props}
                moves={moves}
                handleClick={handleClick}
                fieldSize={settings.fieldSize}
                gameStatus={gameStatus}
              />
            )}
          />
          <Route path='/game_in_dots/game-settings' component={Settings} />
          <Route path='/game_in_dots/winners' component={Winners} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
