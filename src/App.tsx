import { useRef } from 'react';
import './App.css';

interface FigureOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  type: 'rectangle' | 'circle';
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = canvasRef.current?.getContext('2d');
  console.log(ctx);

  class Figure {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    speed: number;
    type: 'rectangle' | 'circle';

    constructor(options: FigureOptions) {
      this.x = options.x;
      this.y = options.y;
      this.width = options.width;
      this.height = options.height;
      this.color = options.color;
      this.speed = options.speed;
      this.type = options.type;
    }
  }

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
