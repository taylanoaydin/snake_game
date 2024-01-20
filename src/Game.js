import React, { useState, useEffect } from 'react';
import Board from './Board';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 2, y: 2 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const SPEED = 75;

function Game() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  function reinit() {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
  }
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction === 'DOWN') {
            return;
          }
          setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction === 'UP') {
            return;
          }
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction === 'RIGHT') {
            return;
          }
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction === 'LEFT') {
            return;
          }
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const moveSnake = () => {
      setSnake(prevSnake => {
        let newSnake = [...prevSnake];
        let head = { ...newSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          default:
            break;
        }

        newSnake.unshift(head);
        newSnake.pop();

        // Collision with walls
        if (head.x >= BOARD_SIZE || head.x < 0 || head.y >= BOARD_SIZE || head.y < 0) {
          setGameOver(true);
        }

        // Collision with self
        for (let i = 1; i < newSnake.length; i++) {
          if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
            setGameOver(true);
          }
        }

        // Eating food
        if (head.x === food.x && head.y === food.y) {
          newSnake.push({});
          setScore(prevScore => prevScore + 10);
          setFood({
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
          });
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, SPEED);

    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver]);

  return (
    <div>
      {gameOver ? <div>Game Over! <button onClick={reinit}>Restart</button></div>  : <Board snake={snake} food={food} />}
        <div>Score: {score}</div>
    </div>
  );
}

export default Game;
