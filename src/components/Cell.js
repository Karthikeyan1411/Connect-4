import React from 'react'

const Cell = ({value, onClick}) => {

  const color = value ? (value === 'Red' ? 'red' : 'yellow') : 'white';

  return (
    <div className='cell'
      onClick={onClick}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

export default Cell