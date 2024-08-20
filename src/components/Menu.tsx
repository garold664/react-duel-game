import React, { useState } from 'react';
import Player from '../classes/Player';

interface MenuProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: Player;
}

export default function Menu({ setIsMenuShown, currentPlayer }: MenuProps) {
  const [bulletColor, setBulletColor] = useState(currentPlayer.bulletColor);

  return (
    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 backdrop-blur-md border-primary-500 border-4 rounded-xl flex  flex-col justify-center items-center bg-primary-900/35 shadow-lg shadow-primary-900 z-[100] gap-10 p-6">
      <h2 className="text-2xl">{`Set color of bullets for ${currentPlayer.name}`}</h2>

      <label
        className="w-32 h-32 rounded-full flex justify-center items-center"
        style={{ backgroundColor: bulletColor }}
      >
        <input
          className="opacity-0 w-0 h-0"
          type="color"
          value={currentPlayer.bulletColor}
          onChange={(e) => {
            currentPlayer.bulletColor = e.target.value;
            setBulletColor(e.target.value);
          }}
        />
      </label>

      <button
        className="absolute right-2 top-2 p-0 w-10 h-10 rounded-full"
        onClick={() => setIsMenuShown(false)}
      >
        X
      </button>
    </div>
  );
}
