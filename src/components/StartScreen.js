import React from 'react'
import {useNavigate} from 'react-router-dom';

const StartScreen = () => {

  const navigate = useNavigate();

  const handleStartGame = (mode) => {
    navigate(`/game/${mode}`);
  }

  return (
    <div className= "container">
      <h1>Connect 4</h1>
      <button onClick={() => handleStartGame('player-vs-player')}>Player vs Player</button>
      <button onClick={() => handleStartGame('player-vs-computer')}>Player vs Computer</button>
    </div>
  );
};

export default StartScreen