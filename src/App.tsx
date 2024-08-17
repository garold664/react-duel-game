import { useEffect, useRef } from 'react';
import './App.css';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_RADIUS = 25;
const PLAYER1_COLOR = '#f04500';
const PLAYER2_COLOR = '#00f0f0';
const BULLET_RADIUS = 10;
const BULLET_COLOR1 = '#ff0000';
const BULLET_COLOR2 = '#8000ff';
const BULLET_SPEED1 = 5;
const BULLET_SPEED2 = 5;
const INITIAL_BULLET_RATE = 10;

class Figure {
  x: number;
  y: number;
  width: number;
  height?: number;
  color: string;
  speed: number;
  type: 'rectangle' | 'circle';
  name: string;

  constructor(options: FigureOptions) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.color = options.color;
    this.speed = options.speed;
    this.type = options.type;
    this.name = options.name;

    if (options.type === 'rectangle') {
      this.height = options.height;
    }
  }
}

class Bullet extends Figure {
  id: number;
  constructor(options: BulletOptions) {
    super(options);
    this.id = options.id;
  }
}

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
        player === 'player1' ? CANVAS_WIDTH / 2 - 100 : CANVAS_WIDTH / 2 + 100;
      ctx.font = "30px 'Pixelify Sans'";
      ctx.fillStyle = player === 'player1' ? PLAYER1_COLOR : PLAYER2_COLOR;
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
      if (
        player.y > CANVAS_HEIGHT - PLAYER_RADIUS ||
        player.y < 0 + PLAYER_RADIUS
      ) {
        player.speed = player.speed * -1;
      }
      player.y += player.speed;
      // }
    }

    function moveBullet(
      shootingRate: number,
      playerName: 'player1' | 'player2',
      gameFrame: React.MutableRefObject<number>
    ) {
      const player = playerName === 'player1' ? player1 : player2;
      const enemy = playerName === 'player1' ? player2 : player1;

      gameFrame.current = Math.floor(
        (gameFrame.current + 1) % (1000 / shootingRate)
      );

      if (gameFrame.current === 1) {
        console.log('playerName: ', playerName);
        const bullet = new Bullet({
          name: 'bullet' + playerName,
          x: player.x,
          y: player.y,
          width: BULLET_RADIUS * 2,
          color:
            playerName === 'player1'
              ? bullet1Color.current
              : bullet2Color.current,
          speed: playerName === 'player1' ? BULLET_SPEED1 : -BULLET_SPEED2,
          type: 'circle',
          id: Date.now(),
        });
        bullets.current.push(bullet);
        console.log(bullets.current);
        drawElement(bullet);
      }

      bullets.current.forEach((bullet) => {
        bullet.x += bullet.speed;
        drawElement(bullet);
        // console.log(bullet.x, i);
        if (playerName === 'player1') {
          if (bullet.x > CANVAS_WIDTH - BULLET_RADIUS) {
            // console.log('end: ', playerName);
            bullets.current = bullets.current.filter(
              (item) => item.id !== bullet.id
            );
          }
        } else {
          if (bullet.x - BULLET_RADIUS < 0) {
            // console.log('end: ', playerName);
            bullets.current = bullets.current.filter(
              (item) => item.id !== bullet.id
            );
          }
        }

        if (
          bullet.x + BULLET_RADIUS > enemy.x - PLAYER_RADIUS &&
          bullet.x - BULLET_RADIUS < enemy.x + PLAYER_RADIUS &&
          bullet.y + BULLET_RADIUS > enemy.y - PLAYER_RADIUS &&
          bullet.y - BULLET_RADIUS < enemy.y + PLAYER_RADIUS &&
          !bullet.name.endsWith(enemy.name)
        ) {
          if (playerName === 'player1') {
            console.log('hit: ', playerName);
            player1Score.current++;
          } else {
            player2Score.current++;
          }
          bullets.current = bullets.current.filter(
            (item) => item.id !== bullet.id
          );
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
      moveBullet(player2ShootingRate.current, 'player2', gameFrame1);
      moveBullet(player1ShootingRate.current, 'player1', gameFrame2);
      movePlayer(player1);
      movePlayer(player2);
      window.requestAnimationFrame(loop);
    }

    const player1 = new Figure({
      name: 'player1',
      x: PLAYER_RADIUS + 5,
      y: 100,
      width: PLAYER_RADIUS * 2,
      color: PLAYER1_COLOR,
      speed: 5,
      type: 'circle',
    });

    const player2 = new Figure({
      name: 'player2',
      x: CANVAS_WIDTH - PLAYER_RADIUS - 5,
      y: 100,
      width: PLAYER_RADIUS * 2,
      color: PLAYER2_COLOR,
      speed: 5,
      type: 'circle',
    });

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
