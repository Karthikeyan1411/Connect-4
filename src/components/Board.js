import React from 'react'
import Cell from './Cell'

const Board = ({board, onClick}) => {
  return (
    <div className='board'>
      {board.map((row, rowIndex) => 
        row.map((cell, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`}
            value = {cell}
            onClick = {() => onClick(colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board