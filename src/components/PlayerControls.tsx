import React, { useState } from 'react';
import Range from './Range';
import Player from '../helpers/classes/Player';

interface PlayerControlsProps {
  player: Player;
}
export default function PlayerControls({ player }: PlayerControlsProps) {
  const [playerSpeed, setPlayerSpeed] = useState(Math.abs(player.speed));
  const [shootRate, setShootRate] = useState(Math.abs(player.shootingRate));

  return (
    <div>
      <h2 className="text-4xl">{player.name}</h2>
      <Range
        min={0}
        max={5}
        step={0.2}
        value={playerSpeed}
        onChange={(e) => {
          player.speed = Number(e.target.value);
          setPlayerSpeed(Number(e.target.value));
        }}
      />
      <Range
        min={0}
        max={30}
        value={shootRate}
        onChange={(e) => {
          player.shootingRate = Number(e.target.value);
          setShootRate(Number(e.target.value));
        }}
      />
    </div>
  );
}
