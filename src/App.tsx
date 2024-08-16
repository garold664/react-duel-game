import { useEffect, useRef } from 'react';
import './App.css';

const PLAYER_RADIUS = 25;
const PLAYER1_COLOR = '#f04500';

interface Circle {
  x: number;
  y: number;
  width: number;
  color: string;
  speed: number;
  type: 'circle';
}
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  type: 'rectangle';
}
type FigureOptions = Circle | Rect;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');

    class Figure {
      x: number;
      y: number;
      width: number;
      height?: number;
      color: string;
      speed: number;
      type: 'rectangle' | 'circle';

      constructor(options: FigureOptions) {
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.color = options.color;
        this.speed = options.speed;
        this.type = options.type;

        if (options.type === 'rectangle') {
          this.height = options.height;
        }
      }
    }
    function drawElements(figure: Figure) {
      if (!ctx) return;
      if (figure.type === 'rectangle' && figure.height) {
        ctx.fillStyle = figure.color;
        ctx.fillRect(figure.x, figure.y, figure.width, figure.height);
      } else if (figure.type === 'circle') {
        ctx.fillStyle = figure.color;
        ctx.beginPath();
        ctx.arc(figure.x, figure.y, figure.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    const player1 = new Figure({
      x: PLAYER_RADIUS + 5,
      y: 100,
      width: PLAYER_RADIUS * 2,
      color: PLAYER1_COLOR,
      speed: 5,
      type: 'circle',
    });

    drawElements(player1);

    return () => {
      if (!canvasRef.current) return;
      const currentCanvas = canvasRef.current;
      const ctx = currentCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
    };
  }, []);

  return (
    <>
      <canvas
        width={800}
        height={800}
        className="border border-primary-200 rounded-lg"
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default App;
