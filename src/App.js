import { Route, Routes } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import Game from './components/Game';

import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path='/game/:mode' element={<Game />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
