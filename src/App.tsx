import { useEffect, useRef, useState } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './helpers/constants';
import './App.css';

import { player1, player2 } from './helpers/players';
import drawElements from './helpers/drawElements';
import clearRect from './helpers/clearRect';
import showMenu from './helpers/showMenu';
import Menu from './components/Menu';
import throttle from './helpers/throttle';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const start = useRef<number | undefined>();

  const mouseCoords = useRef({ x: 0, y: 0 });

  const [isMenuShown, setIsMenuShown] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>(
    'player1'
  );

  const getMouseCoords = throttle(function (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    mouseCoords.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  },
  40);
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
      drawElements(ctx);

      player1.shoot(ctx);
      player2.shoot(ctx);
      player1.move(mouseCoords.current);
      player2.move(mouseCoords.current);
      window.requestAnimationFrame(loop);
    }

    loop(0);

    return () => {
      if (!ctx) return;
      clearRect(ctx);
    };
  }, []);

  return (
    <>
      <h1>React Duel Game</h1>
      {isMenuShown && (
        <Menu
          key={currentPlayer}
          setIsMenuShown={setIsMenuShown}
          currentPlayer={currentPlayer === 'player1' ? player1 : player2}
        />
      )}
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-primary-200 rounded-lg"
        ref={canvasRef}
        onClick={showMenu(setIsMenuShown, setCurrentPlayer, player1, player2)}
        onMouseMove={getMouseCoords}
      ></canvas>
    </>
  );
}

export default App;
