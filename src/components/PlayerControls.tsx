import { memo, useCallback, useState } from 'react';
import Range from './Range';
import Player from '../helpers/classes/Player';

interface PlayerControlsProps {
  player: Player;
}
const PlayerControls = memo(({ player }: PlayerControlsProps) => {
  // console.log('player controls rendered');
  const [playerSpeed, setPlayerSpeed] = useState(Math.abs(player.speed));
  const [shootRate, setShootRate] = useState(Math.abs(player.shootingRate));

  const speedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      player.speed = Number(e.target.value);
      setPlayerSpeed(Number(e.target.value));
    },
    [player]
  );

  const shootRateOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      player.shootingRate = Number(e.target.value);
      setShootRate(Number(e.target.value));
    },
    [player]
  );

  return (
    <div className="p-2">
      <h2 className="text-4xl">{player.name}</h2>
      <Range
        label="speed"
        min={0}
        max={5}
        step={0.2}
        value={playerSpeed}
        onChange={speedOnChange}
      />
      <Range
        label="shooting rate"
        min={0}
        max={30}
        value={shootRate}
        onChange={shootRateOnChange}
      />
    </div>
  );
});

export default PlayerControls;
