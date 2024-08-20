import Figure from './Figure';
import {
  CANVAS_HEIGHT,
  BULLET_RADIUS,
  BULLET_SPEED1,
  BULLET_SPEED2,
  CANVAS_WIDTH,
} from '../helpers/constants';
import getDistance from '../helpers/getDistance';
import Bullet from './Bullet';
import HitEffect from './HitEffect';

let timer = 0;
let growFactor = 1.01;
let opacity = 1;

class Player extends Figure {
  bulletColor: string;
  score: number;
  name: 'player1' | 'player2';
  shootingRate: number;
  gameFrame: number;
  radius: number;
  hit: boolean;
  hitEffect: HitEffect;

  static player1: Player;
  static player2: Player;
  constructor(options: PlayerOptions) {
    super(options);
    this.bulletColor = options.bulletColor;
    this.score = options.score;
    this.name = options.name;
    this.shootingRate = options.shootingRate;
    this.gameFrame = options.gameFrame;
    this.radius = options.radius;
    this.hit = options.hit;
    this.hitEffect = new HitEffect({
      name: 'hitEffect',
      type: 'circle',
      color: '#ffffff40',
      lineWidth: 0,
      x: -1000,
      y: -1000,
      radius: this.radius,
    });
  }

  move(mouseCoords: { x: number; y: number }) {
    // const overlap = 5 + Math.abs(this.speed * 0.5);
    const overlap = 5;
    if (this.y > CANVAS_HEIGHT - this.radius || this.y < 0 + this.radius) {
      this.speed = -this.speed;
    }
    const distance = getDistance(this.x, this.y, mouseCoords.x, mouseCoords.y);
    const isTouching =
      distance <= this.radius + overlap && distance > this.radius - overlap;

    if (
      isTouching &&
      ((this.speed > 0 && mouseCoords.y > this.y) ||
        (this.speed < 0 && mouseCoords.y < this.y))
    ) {
      this.speed = -this.speed;
    }

    if (this.y + this.radius > CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.radius;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }

    this.y += this.speed;
  }

  shoot(ctx: CanvasRenderingContext2D | null) {
    const playerName = this.name;
    const player = playerName === 'player2' ? Player.player2 : Player.player1;
    const enemy = playerName === 'player1' ? Player.player2 : Player.player1;

    player.gameFrame = Math.floor(
      (player.gameFrame + 1) % (1000 / player.shootingRate)
    );

    if (
      (player.name === 'player1' && player.gameFrame === 0) ||
      (player.name === 'player2' && player.gameFrame === 30)
    ) {
      const bullet = new Bullet({
        name: 'bullet' + playerName,
        x: player.x,
        y: player.y,
        radius: BULLET_RADIUS,
        color: player.bulletColor,
        speed: playerName === 'player1' ? BULLET_SPEED1 : -BULLET_SPEED2,
        type: 'circle',
        id: Date.now(),
        lineWidth: 0,
      });
      Bullet.bullets.push(bullet);
      bullet.drawElement(ctx);
    }

    if (enemy.hit) {
      timer++;

      enemy.hitEffect.x = enemy.x;
      enemy.hitEffect.y = enemy.y;
      enemy.hitEffect.radius *= growFactor;
      enemy.hitEffect.color = `rgba(150, 0, 0, ${opacity})`;
      opacity -= 0.03;
      growFactor += 0.005;

      if (timer > 28) {
        opacity = 1;
        enemy.hitEffect.x = -1000;
        enemy.hitEffect.y = -1000;
        enemy.hitEffect.radius = enemy.radius;
        timer = 0;
        enemy.hit = false;
        growFactor = 1.01;
        // console.log(enemy.color);
      }
      enemy.hitEffect.drawElement(ctx);
    }
    Bullet.bullets.forEach((bullet) => {
      bullet.x += bullet.speed;
      bullet.drawElement(ctx);
      if (playerName === 'player1') {
        if (bullet.x > CANVAS_WIDTH - BULLET_RADIUS) {
          Bullet.bullets = Bullet.bullets.filter(
            (item) => item.id !== bullet.id
          );
        }
      } else {
        if (bullet.x - bullet.radius < 0) {
          Bullet.bullets = Bullet.bullets.filter(
            (item) => item.id !== bullet.id
          );
        }
      }

      if (
        bullet.x + bullet.radius > enemy.x - player.radius &&
        bullet.x - bullet.radius < enemy.x + player.radius &&
        bullet.y + bullet.radius > enemy.y - player.radius &&
        bullet.y - bullet.radius < enemy.y + player.radius &&
        !bullet.name.endsWith(enemy.name)
      ) {
        player.score++;
        Bullet.bullets = Bullet.bullets.filter((item) => item.id !== bullet.id);
        enemy.hit = true;
      }
    });
  }
}

export default Player;
