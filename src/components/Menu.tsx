import React, { useState } from 'react';
import { Figure } from '../helpers/classes';

interface MenuProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: Figure;
  bullet1Color: React.MutableRefObject<string>;
  bullet2Color: React.MutableRefObject<string>;
}

export default function Menu({
  setIsMenuShown,
  currentPlayer,
  bullet1Color,
  bullet2Color,
}: MenuProps) {
  const [playerSpeed, setPlayerSpeed] = useState(currentPlayer.speed);
  return (
    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 backdrop-blur-md border-primary-500 border-4 rounded-xl flex  flex-col justify-center items-center bg-primary-900/35 shadow-lg shadow-primary-900">
      <h2>{`Menu for ${currentPlayer.name}`}</h2>
      <input
        type="color"
        value={
          currentPlayer.name === 'player1'
            ? bullet1Color.current
            : bullet2Color.current
        }
        onChange={(e) => {
          if (currentPlayer.name === 'player1') {
            bullet1Color.current = e.target.value;
          } else {
            bullet2Color.current = e.target.value;
          }
        }}
      />
      <div>
        <label>speed:</label>
        <input
          type="range"
          min={0}
          max={30}
          // defaultValue={currentPlayer.speed}
          value={playerSpeed}
          onChange={(e) => {
            currentPlayer.speed = Number(e.target.value);
            setPlayerSpeed(Number(e.target.value));
            // console.log(e.target.value);
          }}
        />
        <span>{playerSpeed}</span>
      </div>
      <button onClick={() => setIsMenuShown(false)}>X</button>
    </div>
  );
}
