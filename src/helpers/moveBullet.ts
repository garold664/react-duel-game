import { Bullet } from './classes';
import {
  BULLET_RADIUS,
  BULLET_SPEED1,
  BULLET_SPEED2,
  CANVAS_WIDTH,
  PLAYER_RADIUS,
} from './constants';
import drawElement from './drawElement';
import { player1, player2 } from './players';

function moveBullet(
  shootingRate: number,
  playerName: 'player1' | 'player2',
  gameFrame: React.MutableRefObject<number>,
  bullets: React.MutableRefObject<Bullet[]>,
  ctx: CanvasRenderingContext2D | null = null,
  bulletColor: string,
  score: React.MutableRefObject<number>
) {
  const player = playerName === 'player1' ? player1 : player2;
  const enemy = playerName === 'player1' ? player2 : player1;

  gameFrame.current = Math.floor(
    (gameFrame.current + 1) % (1000 / shootingRate)
  );

  if (gameFrame.current === 1) {
    const bullet = new Bullet({
      name: 'bullet' + playerName,
      x: player.x,
      y: player.y,
      width: BULLET_RADIUS * 2,
      color: bulletColor,
      speed: playerName === 'player1' ? BULLET_SPEED1 : -BULLET_SPEED2,
      type: 'circle',
      id: Date.now(),
    });
    bullets.current.push(bullet);
    // console.log(bullets.current);
    drawElement(bullet, ctx);
  }

  bullets.current.forEach((bullet) => {
    bullet.x += bullet.speed;
    drawElement(bullet, ctx);
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
      // if (playerName === 'player1') {
      //   console.log('hit: ', playerName);
      //   player1Score.current++;
      // } else {
      //   player2Score.current++;
      // }

      score.current++;
      bullets.current = bullets.current.filter((item) => item.id !== bullet.id);
    }
  });
}
export default moveBullet;
