import { memo, useCallback, useState } from 'react';
import Range from './Range';
import Player from '../helpers/classes/Player';
import { RANGE_ONCHANGE_DEBOUNCE_DELAY } from '../helpers/constants';

interface PlayerControlsProps {
  player: Player;
}

const PlayerControls = memo(({ player }: PlayerControlsProps) => {
  // console.log('player controls rendered');
  const [playerSpeed, setPlayerSpeed] = useState(Math.abs(player.speed));
  const [shootRate, setShootRate] = useState(Math.abs(player.shootingRate));

  const debounce = useCallback(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <R, A extends any[]>(
      cb: (...args: A) => R,
      delay = RANGE_ONCHANGE_DEBOUNCE_DELAY
    ) => {
      let timeout: number | undefined;

      return (...args: A) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          cb(...args);
        }, delay);
      };
    },
    []
  );

  const speedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateSpeed = debounce((value: number) => {
        player.speed = value;
      });
      updateSpeed(Number(e.target.value));
      setPlayerSpeed(Number(e.target.value));
    },
    [player, debounce]
  );

  const shootRateOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateShootingRate = debounce((value: number) => {
        player.shootingRate = value;
      });
      updateShootingRate(Number(e.target.value));
      // player.shootingRate = Number(e.target.value);
      setShootRate(Number(e.target.value));
    },
    [player, debounce]
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
