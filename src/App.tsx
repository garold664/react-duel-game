import { useEffect, useRef } from 'react';
import './App.css';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_RADIUS = 25;
const PLAYER1_COLOR = '#f04500';
const PLAYER2_COLOR = '#00f0f0';
const BULLET_RADIUS = 5;
const BULLET_COLOR = '#f0f0f0';
const BULLET_SPEED = 5;

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

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const start = useRef<number | undefined>();
  const player1Score = useRef(0);
  const player2Score = useRef(0);

  const gameFrame = useRef(0);
  const bullets = useRef<Figure[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current?.getContext('2d');

    function drawElement(figure: Figure) {
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

    async function displayScore(score: number, player: 'player1' | 'player2') {
      await document.fonts.ready;
      if (!ctx) return;
      const x =
        player === 'player1' ? CANVAS_WIDTH / 2 + 100 : CANVAS_WIDTH / 2 - 100;
      ctx.font = "30px 'Pixelify Sans'";
      ctx.fillStyle = 'white';
      ctx.fillText(`${score}`, x, 30);
    }

    function drawElements() {
      clearRect(ctx);

      // drawElement(bullet);
      drawElement(player1);
      drawElement(player2);

      displayScore(player1Score.current, 'player1');
      displayScore(player2Score.current, 'player2');
    }

    function clearRect(ctx: CanvasRenderingContext2D | null) {
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    function movePlayer(player: Figure) {
      // if (player.y > 0 && player.y < CANVAS_HEIGHT - PLAYER_RADIUS) {
      if (
        player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
        player.y < 0 + PLAYER_RADIUS
      ) {
        player.speed = player.speed * -1;
      }
      player.y += player.speed;
      // }
    }

    function moveBullet(elapsed: number) {
      gameFrame.current = Math.floor((gameFrame.current + 1) % 120);
      if (gameFrame.current === 1) {
        const bullet = new Figure({
          x: player1.x,
          y: player1.y,
          width: BULLET_RADIUS * 2,
          color: BULLET_COLOR,
          speed: BULLET_SPEED,
          type: 'circle',
        });
        bullets.current.push(bullet);
        console.log(bullets.current);
        drawElement(bullet);
      }
      bullets.current.forEach((bullet, i) => {
        // bullet.y = player1.y;
        bullet.x += bullet.speed;
        drawElement(bullet);
        // console.log(bullet.x, i);

        if (bullet.x > CANVAS_WIDTH - BULLET_RADIUS) {
          bullets.current.shift();
          // bullet.y = player1.y;
          // bullet.x = player1.x;
        }
      });
    }

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
      drawElements();
      movePlayer(player1);
      movePlayer(player2);
      moveBullet(elapsed);
      window.requestAnimationFrame(loop);
    }

    const player1 = new Figure({
      x: PLAYER_RADIUS + 5,
      y: 100,
      width: PLAYER_RADIUS * 2,
      color: PLAYER1_COLOR,
      speed: 5,
      type: 'circle',
    });

    const player2 = new Figure({
      x: CANVAS_WIDTH - PLAYER_RADIUS - 5,
      y: CANVAS_HEIGHT - 100,
      width: PLAYER_RADIUS * 2,
      color: PLAYER2_COLOR,
      speed: 5,
      type: 'circle',
    });

    // const bullet = new Figure({
    //   x: 0 - BULLET_RADIUS * 2,
    //   y: CANVAS_HEIGHT / 2 - BULLET_RADIUS,
    //   width: BULLET_RADIUS * 2,
    //   color: BULLET_COLOR,
    //   speed: 5,
    //   type: 'circle',
    // });

    // bullets.current.push(bullet);

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
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-primary-200 rounded-lg"
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default App;
