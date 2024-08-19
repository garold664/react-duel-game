import { memo, useEffect, useRef } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../helpers/constants';
import '../App.css';

import { player1, player2 } from '../helpers/players';
import drawElements from '../helpers/drawElements';
import clearRect from '../helpers/clearRect';
import showMenu from '../helpers/showMenu';
import throttle from '../helpers/throttle';

interface GameBoardProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'player1' | 'player2'>>;
}

const GameBoard = memo(
  ({ setIsMenuShown, setCurrentPlayer }: GameBoardProps) => {
    // console.log('game board rendered');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const start = useRef<number | undefined>();

    const mouseCoords = useRef({ x: 0, y: 0 });

    const getMouseCoords = throttle(function (
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
    ) {
      mouseCoords.current = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    },
    50);
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
);

export default GameBoard;
