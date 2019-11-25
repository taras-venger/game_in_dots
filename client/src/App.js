import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Winners from './components/Winners';
import Navbar from './components/Navbar';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { fetchData, postWinner } from './utils/api';
import { shuffleArray, generateInitMoves } from './utils/otherUtils';

const initSettings = { mode: 'easy', field: 4, delay: 1000 };
const initScore = { player: 0, computer: 0 };
const initGameStatus = { start: false, end: false, result: '' };
const numCells = initSettings.field ** 2;
let activeCell = {};
// Shuffle cells ids in order to facilitate random selection within the 'makeMove' function
let shuffledCells = shuffleArray(numCells);
const defaultMoves = generateInitMoves(numCells);

function App() {
  const [playerName, setPlayerName] = useState('Guest');
  const [settings, setSettings] = useState(initSettings);
  const [moves, setMoves] = useState(defaultMoves); // default, active-cell, player, computer
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

  const handleSettingsChange = newSettings => setSettings({ ...newSettings });

  const resetMovesOnSettingsChange = () => {
    shuffledCells = shuffleArray(settings.field ** 2);
    setMoves(() => generateInitMoves(settings.field ** 2));
  };

  useEffect(() => {
    resetMovesOnSettingsChange();
  }, [settings]);

  const handleRestart = () => {
    setTimeout(() => {
      resetMovesOnSettingsChange();
      setScore(initScore);
      setGameStatus({ ...initGameStatus, start: true });
    }, 500);
  };

  const handleClick = e => {
    const id = parseInt(e.target.dataset.id);
    activeCell.id === id && (activeCell.status = 'player');
  };

  const checkGameOver = () => {
    const target = settings.field ** 2 / 2;
    return (
      score.player > target ||
      score.computer > target ||
      score.player + score.computer === target * 2
    );
  };

  const setGameOver = () => {
    let result;
    score.player > score.computer && (result = playerName);
    score.player < score.computer && (result = 'Computer AI');
    score.player === score.computer && (result = 'Draw');
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
    const gameOver = checkGameOver();
    gameStatus.start && !gameOver && makeMove();
    gameOver && setGameOver();
  }, [score]);

  // Once the game is over, send result (winner, date) to the server
  // The response contains upodated list of winner for the 'Leaders board'
  useEffect(() => {
    const makeRecord = async () => {
      const winnersList = await postWinner(gameStatus.result);
      setWinnersList(winnersList);
    };
    gameStatus.end && makeRecord();
  }, [gameStatus]);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar
          start={handleStart}
          restart={handleRestart}
          inputName={n => setPlayerName(n)}
          gameStatus={gameStatus}
          settingOptions={settingOptions}
          handleSettingsChange={handleSettingsChange}
        />
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <Home
                {...props}
                moves={moves}
                handleClick={handleClick}
                fieldSize={settings.field}
                gameStatus={gameStatus}
              />
            )}
          />
          <Route
            path='/winners'
            render={props => <Winners {...props} winnersList={winnersList} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
