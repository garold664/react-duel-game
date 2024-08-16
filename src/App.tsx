import { useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <canvas width={800} height={800} ref={canvasRef}></canvas>
    </>
  );
}

export default App;
