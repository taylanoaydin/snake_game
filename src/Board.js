import React from 'react';
import Cell from './Cell';

const BOARD_SIZE = 20;

function Board({ snake, food }) {
  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let isSnakeCell = snake.some(segment => segment.x === j && segment.y === i);
        let isFoodCell = food.x === j && food.y === i;
        let cellType = isSnakeCell ? 'snake' : isFoodCell ? 'food' : 'empty';

        board.push(<Cell key={`${i}-${j}`} sfe={cellType} />);
      }
    }
    return board;
  };

  return (
    <div style={{ 
      border: '1px solid black',
      display: 'inline-block',
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`
      }}>
        {renderBoard()}
      </div>
    </div>
  );
}

export default Board;
