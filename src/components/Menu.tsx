import React, { useState } from 'react';
import { Figure } from '../helpers/classes';

interface MenuProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: Figure;
  bullet1Color: React.MutableRefObject<string>;
  bullet2Color: React.MutableRefObject<string>;
  shootingRate: React.MutableRefObject<number>;
}

export default function Menu({
  setIsMenuShown,
  currentPlayer,
  bullet1Color,
  bullet2Color,
  shootingRate,
}: MenuProps) {
  const [playerSpeed, setPlayerSpeed] = useState(Math.abs(currentPlayer.speed));
  const [shootRate, setShootRate] = useState(Math.abs(shootingRate.current));
  // console.log('playerSpeed: ', playerSpeed);
  // console.dir(currentPlayer);
  return (
    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 backdrop-blur-md border-primary-500 border-4 rounded-xl flex  flex-col justify-center items-center bg-primary-900/35 shadow-lg shadow-primary-900">
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
      <div className="flex gap-4 py-6">
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
        <span className="w-10">{playerSpeed}</span>
      </div>
      <div className="flex gap-4 py-6">
        <label>shooting rate:</label>
        <input
          type="range"
          min={0}
          max={30}
          // defaultValue={currentPlayer.speed}
          value={shootRate}
          onChange={(e) => {
            shootingRate.current = Number(e.target.value);
            setShootRate(Number(e.target.value));
          }}
        />
        <span className="w-10">{shootRate}</span>
      </div>
      <button onClick={() => setIsMenuShown(false)}>X</button>
    </div>
  );
}
