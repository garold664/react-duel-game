import { useEffect, useRef, useState } from 'react';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BULLET_COLOR1,
  BULLET_COLOR2,
  INITIAL_BULLET_RATE,
} from './helpers/constants';
import './App.css';

import { Bullet } from './helpers/classes';
import { player1, player2 } from './helpers/players';
import moveBullet from './helpers/moveBullet';
import movePlayer from './helpers/movePlayer';
import drawElements from './helpers/drawElements';
import clearRect from './helpers/clearRect';
import toggleMenu from './helpers/toggleMenu';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const start = useRef<number | undefined>();
  const player1Score = useRef(0);
  const player2Score = useRef(0);
  const player1ShootingRate = useRef(INITIAL_BULLET_RATE);
  const player2ShootingRate = useRef(INITIAL_BULLET_RATE);

  const gameFrame1 = useRef(0);
  const gameFrame2 = useRef(1);
  const bullets = useRef<Bullet[]>([]);
  const bullet1Color = useRef(BULLET_COLOR1);
  const bullet2Color = useRef(BULLET_COLOR2);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');

    function loop(timeStamp: number) {
      if (start.current === undefined) {
        start.current = timeStamp;
      }
      const elapsed = timeStamp - start.current;
      // console.log(elapsed);
      if (elapsed > 1000) {
        start.current = timeStamp;
      }
      // const shift = Math.min(elapsed / 10, 200);
      drawElements(ctx, player1Score.current, player2Score.current);
      moveBullet(
        player2ShootingRate.current,
        'player2',
        gameFrame1,
        bullets,
        ctx,
        bullet2Color.current,
        player2Score
      );
      moveBullet(
        player1ShootingRate.current,
        'player1',
        gameFrame2,
        bullets,
        ctx,
        bullet1Color.current,
        player1Score
      );
      movePlayer(player1);
      movePlayer(player2);
      window.requestAnimationFrame(loop);
    }

    loop(0);

    return () => {
      if (!canvasRef.current) return;
      const currentCanvas = canvasRef.current;
      const ctx = currentCanvas.getContext('2d');
      clearRect(ctx);
    };
  }, []);

  return (
    <>
      <h1>React Duel Game</h1>
      {isMenuShown && <div>{`Menu for ${currentPlayer}`}</div>}
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-primary-200 rounded-lg"
        ref={canvasRef}
        onClick={toggleMenu(setIsMenuShown, setCurrentPlayer, player1, player2)}
      ></canvas>
    </>
  );
}

export default App;
