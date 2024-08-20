import { memo, useEffect, useRef } from 'react';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../helpers/constants';
import '../App.css';

import { player1, player2 } from '../helpers/players';
import drawElements from '../helpers/drawElements';
import clearRect from '../helpers/clearRect';
import showMenu from '../helpers/showMenu';
import {
  getMouseCoords,
  updateMouseCoordsOnMouseLeave,
} from '../helpers/mouseCoordsHelpers';

interface GameBoardProps {
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'player1' | 'player2'>>;
}

const GameBoard = memo(
  ({ setIsMenuShown, setCurrentPlayer }: GameBoardProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseTracker = useRef<HTMLDivElement | null>(null);
    const mouseCoords = useRef({ x: 0, y: 0 });

    useEffect(() => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current?.getContext('2d');

      function loop() {
        drawElements(ctx);

        player1.shoot(ctx);
        player2.shoot(ctx);
        player1.move(mouseCoords.current);
        player2.move(mouseCoords.current);
        window.requestAnimationFrame(loop);
      }

      loop();

      return () => {
        if (!ctx) return;
        clearRect(ctx);
      };
    }, []);

    return (
      <div className="relative">
        <canvas
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-primary-200 rounded-lg"
          ref={canvasRef}
          onClick={showMenu(setIsMenuShown, setCurrentPlayer, player1, player2)}
          onMouseMove={getMouseCoords(mouseCoords, mouseTracker)}
          onMouseLeave={updateMouseCoordsOnMouseLeave(
            mouseCoords,
            mouseTracker
          )}
        ></canvas>
        {/* <div
          ref={mouseTracker}
          className="w-2 h-2 bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 "
        ></div> */}
      </div>
    );
  }
);

export default GameBoard;
