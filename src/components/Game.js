import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';

const rows = 6;
const columns = 7;
const initialBoard = Array(rows).fill(null).map(() => Array(columns).fill(null));

const Game = () => {
  const { mode } = useParams(); // Get game mode from URL
  const [board, setBoard] = useState(initialBoard);
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [aiMoveTriggered, setAiMoveTriggered] = useState(false);

  // Function to calculate the winner
  const calculateWinner = (board) => {
    const checkDirection = (row, col, dr, dc) => {
      const color = board[row][col];
      let count = 0;
      while (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < columns &&
        board[row][col] === color
      ) {
        count++;
        row += dr;
        col += dc;
      }
      return count >= 4;
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (board[row][col]) {
          if (
            checkDirection(row, col, 0, 1) || // horizontal
            checkDirection(row, col, 1, 0) || // vertical
            checkDirection(row, col, 1, 1) || // diagonal right
            checkDirection(row, col, 1, -1)   // diagonal left
          ) {
            return board[row][col];
          }
        }
      }
    }
    return null;
  };

  // Function to handle dropping a disc
  const dropDisc = useCallback((col) => {
    if (winner) return;
    
    const newBoard = board.map(row => row.slice());
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = isRedNext ? 'Red' : 'Yellow';
        setBoard(newBoard);
        const gameWinner = calculateWinner(newBoard);
        setWinner(gameWinner);
        setIsRedNext(!isRedNext);
        setAiMoveTriggered(mode === 'player-vs-computer' && !isRedNext && !gameWinner);
        return;
      }
    }
  }, [board, isRedNext, mode, winner]);

  // AI move function
  const aiMove = useCallback(() => {
    // Simple AI: choose a random valid column
    let validCols = [];
    for (let col = 0; col < columns; col++) {
      if (!board[0][col]) validCols.push(col);
    }
    if (validCols.length === 0) return;

    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
    dropDisc(randomCol); // Call dropDisc with the selected column
  }, [dropDisc, board]);

  // useEffect for AI move handling
  useEffect(() => {
    if (aiMoveTriggered) {
      const timer = setTimeout(() => {
        aiMove();
        setAiMoveTriggered(false);
      }, 1000); // AI moves after a delay

      return () => clearTimeout(timer);
    }
  }, [aiMoveTriggered, aiMove]);

  useEffect(() => {
    // Reset the game when mode changes
    setBoard(initialBoard);
    setIsRedNext(true);
    setWinner(null);
  }, [mode]);

  return (
    <div>
      <h1>Connect 4</h1>
      <Board board={board} onClick={dropDisc} />
      {winner ? <h2 className='h2'>{winner} Wins!</h2> : <h2 className='h2'>{isRedNext ? 'Red' : 'Yellow'}'s turn</h2>}
    </div>
  );
};

export default Game;
